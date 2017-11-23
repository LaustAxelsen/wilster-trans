var assert = require('assert')
var expect = require('chai').expect
var Trans = require('./../index.js')
var exec = require('child_process').exec

describe('Config', function() {
  describe('default locale', function() {
    Trans.init({
      config: {
        defaultLocale: 'en'
      },
      locales: {
        en: require('./translations/en.json'),
        da: require('./translations/da.json')
      }
    })

    it('should be the same as the config file', function() {
      expect(Trans.getLocale()).to.equal('en')
    })

    it('should be possible to change', function() {
      Trans.setLocale('da')
      expect(Trans.getLocale()).to.equal('da')
    })

    it('should be possible to change back', function() {
      Trans.setLocale('en')
      expect(Trans.getLocale()).to.equal('en')
    })
  })
})

describe('Translations', function() {
  describe('translate', function() {
    it('should be the same as the config file', function() {
      expect(Trans.t('welcome.heading')).exist
    })

    it('should return translation key if nothing is found', function() {
      expect(Trans.t('random.key')).to.equal('random.key')
    })

    it('should replace placeholders', function() {
      expect(Trans.t('welcome.greetings', { name: 'Test' })).to.equal('Welcome Test, dear friend!')
    })

    it('should replace same placeholder several times', function() {
      expect(Trans.t('welcome.description', { name: 'Test' })).to.equal('Test, is your name really Test?')
    })

    it('should use correct lang', function() {
      Trans.setLocale('da')
      expect(Trans.t('welcome.heading')).to.equal('Hej verden!')
      Trans.setLocale('en')
      expect(Trans.t('welcome.heading')).to.equal('Hello world!')
    })
  })
})
