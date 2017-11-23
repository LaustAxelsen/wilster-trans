let loadedLocalFiles = {}
let currentLocal = null
var model = {
  init: function(configPath) {
    // loading config
    let loadedConfig = require(configPath)

    // setting default locale
    currentLocal = loadedConfig.defaultLocale

    // loading languages
    loadedConfig.languages.forEach(local => {
      loadedLocalFiles[local] = require(loadedConfig.outputDir + local)
    })
  },
  setLocale: function(locale) {
    if (!loadedLocalFiles[currentLocal]) throw 'Locale not found'
    currentLocal = locale
  },
  t: function(translationKey, params) {
    // no locale
    if (!loadedLocalFiles[currentLocal]) throw 'Locale not found'

    // no translation key
    if (!loadedLocalFiles[currentLocal][translationKey]) {
      console.warn('[wilster-trans] Missing translation key: ' + translationKey + ' (' + currentLocal + ')')
      return translationKey
    }

    // params?
    if (params) {
      var translation = loadedLocalFiles[currentLocal][translationKey]

      for (var property in params) {
        if (params.hasOwnProperty(property)) {
          translation = translation.replace(new RegExp('%' + property + '%', 'g'), params[property])
        }
      }
      return translation
    }

    // pure translation
    return loadedLocalFiles[currentLocal][translationKey]
  }
}

module.exports = model
