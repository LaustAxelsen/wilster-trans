# Wilster-trans

It's always bugged me how difficult translations in applications ends up being, so this is an attempt on making that task as simple as possible. It's based on some really nice projects e.g.
[node-polyglot](https://www.npmjs.com/package/node-polyglot).

The only thing I would have like to do better, is the flexibility of extraction - currently you are **required** to name is as `import Trans from 'wilster-trans'` due to my poor regex skills..
nevertheless, it works :)

## Installation

`npm i --save wilster-trans` and for CLI command `npm i -g wilster-trans`

## Getting started

1. Import the repo (`import Trans from 'wilster-trans'`)
2. Run the `Trans.init({config: {...}, locales: {...})` (see example)
3. Start using it (`Trans.t("foo")'`). **NB:** `Trans` is the mandatory name for the extractor to work.
4. Run **`wilster-trans run -s PATH_TO_SRC -o PATH_TO_OUTPUT_DIR -l COMMA_SEPARATED_LOCALES`**. This will extract all the translation keys and put them into your translation directory.

NB: If you want to run the extractor from the local scope, just call `./node_modules/wilster-trans/bin/wilster-trans.js run` instead.

## Use example

**./src/application.js**

```javascript
import React, { Component } from 'react'
import Trans from 'wilster-trans'

// Init's the translator
Trans.init({
  config: {
    defaultLocale: "en"
  },
  locales: {
    en: require("path/to/translations/en.json"),
    da: require("path/to/translations/da.json")
  }
})

export default App extends Component {
	render() {
		return (
			<div>
				<h1>{Trans.t("welcome.heading")}</h1>
				<p>{Trans.t("welcome.greetings", {name: "John Doe"})}</p>
			</div>
		)
	}
}
```

Then run **`wilster-trans run -s ./src -o ./src/translations -l en,da,es,no`**

**./src/translations/en.json**

```json
{
  "welcome.heading": "Hello world",
  "welcome.greetings": "Hi there %name% - nice to see you!"
}
```

## CLI Command(s)

**`wilster-trans run -s PATH_TO_SRC -o PATH_TO_OUTPUT_DIR -l COMMA_SEPARATED_LOCALES` ** Runs the extractor.

**-o || --output** is the output directory.

**-s || --source** is the code source directory (where we'll look for "Trans.t" matches)

**-l || --locales** is the locales that will be created.

## Documentation

* **`Trans.t(translationKey: String, params: Object)`** If you want to use placeholders, you should use the following syntax `Hi there %name%!` in the translation string, and reference it using in the
  `params` object e.g. `Trans.t("...", {name: "John Doe"})`

* **Trans.setLocale('LOCALE_KEY')** Run this method if you want to change from the current language. Then re-render your UI and it'll use the newly set locale.
