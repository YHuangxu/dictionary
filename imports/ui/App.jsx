import React from "react";
import { Container } from "semantic-ui-react";

import Header from "./Header.jsx";
import SearchBar from "./Search.jsx";

import WordsList from "./WordsList";
import wordsAPI from "../api/wordsAPI";


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			words: []
		};
	}

	onSearchSubmit(word) {
		wordsAPI
			.get(`words/${word}`)
			.then(res => this.setState({ words: res.data.results }));
	}

	render() {
		return (
			<Container>
				<Header />

				<h1>LOGO PLACE!</h1>

				<SearchBar onSubmit={this.onSearchSubmit.bind(this)} />

				<WordsList words={this.state.words} />
			</Container>
		);
	}
}
