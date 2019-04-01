import React from "react";
import { Button } from "semantic-ui-react";
export default class App extends React.Component {
	render() {
		return (
			<div id="app">
				<h1>Welcome to Meteor!</h1>
				<Button primary>Primary</Button>
			</div>
		);
	}
}
