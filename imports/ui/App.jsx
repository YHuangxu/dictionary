import React from "react";
import SearchBar from "./Search.jsx";
import { Container } from "semantic-ui-react";


export default class App extends React.Component {
	render() {
		return (
			<Container>
				<h1>Welcome to Meteor!</h1>
				<SearchBar />
			</Container>
		);
	}
}
