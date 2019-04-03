import React from "react";
import { Container } from "semantic-ui-react";

import Header from "./Header.jsx";
import SearchBar from "./Search.jsx";

export default class App extends React.Component {
	render() {
		return (
			<Container>

				<Header />

				<h1>Welcome to Meteor!</h1>

				<SearchBar />

			</Container>
		);
	}
}
