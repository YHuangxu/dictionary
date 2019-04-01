import React from "react";
import { Button } from "semantic-ui-react";
import SearchBox from "./Search.jsx";

export default class App extends React.Component {
	render() {
		return (
			<div id="app">
				<h1>Welcome to Meteor!</h1>

				<SearchBox />
			</div>
		);
	}
}
