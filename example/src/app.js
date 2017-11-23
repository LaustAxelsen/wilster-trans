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