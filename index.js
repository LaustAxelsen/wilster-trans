var loadedLocalFiles = {}
var currentLocal = null
var hasBeenInit = false
var locales = []

var model = {
  init: function(configObj) {
    if (typeof configObj != 'object') throw Error('Invalid config object provided')
    // loading config
    var loadedConfig = configObj

    // setting default locale
    currentLocal = loadedConfig.config ? loadedConfig.config.defaultLocale : null

    for (var property in loadedConfig.locales) {
      if (loadedConfig.locales.hasOwnProperty(property)) {
        if (!currentLocal) currentLocal = property
        locales.push(property)
      }
    }

    // loading languages
    for (var index = 0; index < locales.length; index++) {
      loadedLocalFiles[locales[index]] = loadedConfig.locales[locales[index]]
    }

    if (locales.length == 0) {
      throw Error('No locales defined in wilster-trans init')
    }

    hasBeenInit = true
  },
  setLocale: function(locale) {
    if (!loadedLocalFiles[currentLocal]) throw Error('Locale not found')
    currentLocal = locale
  },
  getLocale: function() {
    return currentLocal
  },
  t: function(translationKey, params) {
    if (!hasBeenInit) throw Error('wilster-trans has not been init')

    // no locale
    if (!loadedLocalFiles[currentLocal]) throw Error('Locale not found')

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
