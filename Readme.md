# Wilster-trans

It's always bugged me how difficult translations in applications ends up being, so this is an attempt on making that task as simple as possible. It's based on some really nice projects e.g.
[node-polyglot](https://www.npmjs.com/package/node-polyglot).

## Installation

`npm i --save wilster-trans`

## Getting started

1. Run **`wilster-trans init` **. This will install a `translation-config.json` file in the root of your application. This file basically tells us where to put the translation files, languages etc.
2. Configure the config to your needs
3. Make some translations in your application by importing the repo (`import Trans from 'wilster-trans'`) and using it (`Trans.t("foo")'`)
4. Run **`wilster-trans run`**. This will extract all the translation keys and put them into your translation directory.

## Use example

**./src/application.js**

```javascript
import React, { Component } from 'react'
import Trans from 'wilster-trans'

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

**./translation-config.json**

```json
{
  // folder to output the translation files
  "outputDir": "./translations",
  // an array of the languages you want to support
  "languages": ["en", "da"],
  // the default language if none is set
  "defaultLocale": "en",
  // the string we are looking for, when extracting translation from application
  "matcher": "Trans.t",
  // the base path for the application.. aka where's the code
  "basePath": "./src"
}
```

**./translations/en.json**

```json
{
  "welcome.heading": "Hello world",
  "welcome.greetings": "Hi there %name% - nice to see you!"
}
```

## CLI Commands

**`wilster-trans init` ** Installs the configuration file, at the location you run the command.

**`wilster-trans run` ** Runs the extractor and reads the config from `./translation-config.json` unless you specify a different path using `--config || -c PATH_TO_CONFIG`

## Documentation

**`Trans.t(translationKey: String, params: Object)`** If you want to use placeholders, you should use the following syntax `Hi there %name%!` in the translation string, and reference it using in the
`params` object e.g. `Trans.t("...", {name: "John Doe"})`

**Trans.setLocale('LANGUAGE_KEY')** Run this method if you want to change from the current language.
