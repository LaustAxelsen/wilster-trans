import Polyglot from 'node-polyglot'
var polyglot = new Polyglot()

// polyglot.load = (lang = Session.get('locale') || 'da') => {
//   if (Meteor.isClient) Session.set('locale', lang)
//   var locales = {}

//   switch (lang) {
//     case 'en':
//       locales = LangEn
//       break
//     case 'da':
//       locales = LangDa
//       break
//     default:
//   }

//   polyglot.extend(locales)
// }

// polyglot.trans = polyglot.t

// polyglot.t = function(key) {
//   if (!this.has(key)) {
//     console.warn('Missing translation for ' + key)
//     return LangEn[key] || key
//   } else {
//     return formatTranslation(polyglot.trans(key) || LangEn[key] || key)
//   }
// }

export default polyglot
