import React from "react";
import SearchBar from "./Search";
import WordsList from "./WordsList";
import wordAPI from "../api/wordAPI";

import { Container } from "semantic-ui-react";

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

	// onWordSubmit = async word => {
	// 	const response = await words.get(`words/${word}`);
	// 	let wordslimit = [];
	// 	for (let i = 0; i < Math.min(response.data.results.length, 10); i++) {
	// 		wordslimit.push(response.data.results[i]);
	// 	}
	// 	this.setState({ words: wordslimit });
	// };

	render() {
		return (
			<Container>
				<h1>Welcome to Meteor!</h1>
				<SearchBar onSubmit={this.onSearchSubmit.bind(this)} />

				<WordsList words={this.state.words} />
			</Container>
		);
	}
}
