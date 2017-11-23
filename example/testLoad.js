var Trans = require('./../index.js')

Trans.init('./example/translation-config.json')

console.log('>> PURE TRANSLATION ', Trans.t('welcome.heading'))
console.log('>> TRANSLATION W. PARAM ', Trans.t('welcome.greetings', { name: 'John Doe' }))

console.log('>> CHANGING LANGUAGE - DA')

Trans.setLocale('da')

console.log('>> PURE TRANSLATION ', Trans.t('welcome.heading'))
console.log('>> TRANSLATION W. PARAM ', Trans.t('welcome.greetings', { name: 'John Doe' }))

console.log('>> MISSING TRANS ', Trans.t('not.found'))
