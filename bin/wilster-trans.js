#!/usr/bin/env node
var path = require('path')
var fs = require('fs')
var dir = require('node-dir')
var program = require('commander')
var _ = require('underscore')

var keysFound = []
var pathToDefauldConfigFile = 'default-translation-config.json'
var defaultConfigName = 'translation-config.json'

/* ------ COMMANDS AND CLI PART :) -------- */

program
  .command('run')
  .option('-c, --config [config]', 'Path to the translation configuration file')
  .action(options => {
    let configPath = options.config || process.cwd() + '/' + pathToDefauldConfigFile

    fs.readFile(configPath, 'utf-8', (error, content) => {
      if (error) throw error
      try {
        let config = JSON.parse(content)
        handleExtraction(config)
      } catch (e) {
        throw e
      }
    })
  })

program.command('init').action(options => {
  fs.readFile(__dirname + '/../' + pathToDefauldConfigFile, 'utf-8', (error, content) => {
    if (error) throw error
    fs.writeFile(process.cwd() + '/' + defaultConfigName, content, (error, data) => {
      if (error) throw error
    })
  })
})

program.parse(process.argv)

/* ------ EXTRACTION PART :) -------- */

let ensureDirectoryExistence = filePath => {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

let doCurrentTranslationRead = config => {
  keysFound = keysFound.sort((a, b) => {
    return a > b ? 1 : -1
  })

  _.each(config.languages, lang => {
    let langPath = config.outputDir + lang + '.json'

    fs.readFile(langPath, 'utf8', (err, data) => {
      if (err && err.errno == -2) {
        ensureDirectoryExistence(langPath)

        fs.writeFile(langPath, ' ', (err, data) => {
          if (err) throw err
          doCurrentTranslationRead(config)
        })
      } else {
        fs.readFile(langPath, 'utf8', (err, data) => {
          let jsObj = {}
          var translationFileObj = {}
          var outputStr = {}

          try {
            jsObj = JSON.parse(data)
          } catch (e) {}

          _.each(keysFound, key => {
            translationFileObj[key] = jsObj[key] || ''
          })

          _.each(translationFileObj, (value, key) => {
            outputStr[key] = value
          })

          fs.writeFile(langPath, JSON.stringify(outputStr, null, 2), err => {
            if (err) {
              return console.log('Error writing file: ' + err)
            }
          })
        })
      }
    })
  })
}

let handleExtraction = config => {
  var folders = [process.cwd() + '/' + config.basePath]

  let readFolder = folder => {
    dir.readFiles(
      folder,
      { match: /.(js|jsx)$/ },
      (err, content, next) => {
        if (err) throw err
        handlePolyglotExtraction(content, config)
        next()
      },
      (err, files) => {
        if (err) throw err
        doCurrentTranslationRead(config)
      }
    )
  }

  folders.forEach(readFolder)
}

let handlePolyglotExtraction = (content, config) => {
  var matches = (String(content).match(/Trans.t\('(.*?)\'/g) || [])
    .map(val => {
      return val.replace(/Trans.t\(/g, '')
    })
    .concat(
      (String(content).match(/Trans.t\("(.*?)\"/g) || []).map(val => {
        return val.replace(/Trans.t\(/g, '')
      })
    )

  matches = matches.map(val => {
    return val.replace(/"|'/g, '')
  })

  _.each(matches, key => {
    if (_.indexOf(keysFound, key) == -1) {
      keysFound.push(key)
    }
  })

  console.log('> Found ' + keysFound.length + ' keys')
}
