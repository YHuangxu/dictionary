import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Image } from "semantic-ui-react";

import NavigationBar from "./NavigationBar.jsx";
import SearchBar from "./SearchBar.jsx";

import TypingAnimation from "../api/type.js";
import WordsList from "./WordsList";

import "../api/wordsAPI";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchWord: "",
			words: [],
			error: ""
		};
	}

	onSearchSubmit(word) {
		if (word.length === 0) {
			this.setState({
				error: "Word is required"
			});
			return;
		}

		Meteor.call("getData", word, (err, res) => {
			if (err) {
				this.setState({
					searchWord: "",
					words: [],
					error: "Word not found"
				});
				return;
			}

			this.setState({
				searchWord: res.word,
				words: res.results,
				error: ""
			});
		});

		// wordsAPI
		// 	.get(`words/${word}`)
		// 	.then(res => {
		// 		console.log("valid");
		// 		this.setState({
		// 			searchWord: res.data.word,
		// 			words: res.data.results,
		// 			error: ""
		// 		});
		// 	})
		// 	.catch(error => {
		// 		console.log(error);

		// 		this.setState({ error: "not a valid word" });
		// 		return;
		// 	});
	}

	render() {
		// let date = new Date();
		// let imgSrc = "/" + date.getDay() + ".png";
		let num = Math.floor(Math.random() * 7) + 1;
		let imgSrc = "/" + num + ".png";

		return (
			<Container textAlign="center">
				<NavigationBar />

				<Image centered src={imgSrc} size="big" />

				<TypingAnimation /> <br />

				<SearchBar onSubmit={this.onSearchSubmit.bind(this)} />

				{this.state.error ? this.state.error : undefined}

				<WordsList
					searchWord={this.state.searchWord}
					words={this.state.words}
				/>
			</Container>
		);
	}
}
