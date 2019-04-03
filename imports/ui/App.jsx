import React from "react";
import { Container } from "semantic-ui-react";

import Header from "./Header.jsx";
import SearchBar from "./Search.jsx";

import WordsList from "./WordsList";
import wordAPI from "../api/wordAPI";


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			words: []
		};
	}

	onSearchSubmit(word) {
		wordAPI
			.get(`words/${word}`)
			.then(res => this.setState({ words: res.data.results }));
	}

	render() {
		return (
			<Container>
				<Header />

				<h1>Welcome to Meteor!</h1>

				<SearchBar />

				<SearchBar onSubmit={this.onSearchSubmit.bind(this)} />

				<WordsList words={this.state.words} />
			</Container>
		);
	}
}
