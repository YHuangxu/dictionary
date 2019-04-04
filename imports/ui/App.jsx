import React from "react";
import { Container } from "semantic-ui-react";

import NavigationBar from "./NavigationBar.jsx";
import SearchBar from "./Search.jsx";

import WordsList from "./WordsList";
import wordsAPI from "../api/wordsAPI";


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchWord: "",
			words: []
		};
	}

	onSearchSubmit(word) {
		wordsAPI
			.get(`words/${word}`)
			.then(res => this.setState({ searchWord: res.data.word, words: res.data.results }));
	}

	render() {
		return (
			<Container>
				<NavigationBar />

				<h1>LOGO PLACE!</h1>

				<SearchBar onSubmit={this.onSearchSubmit.bind(this)} />

				<WordsList searchWord={this.state.searchWord} words={this.state.words} />
			</Container>
		);
	}
}
