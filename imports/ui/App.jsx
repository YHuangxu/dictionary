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
		Meteor.call("getData", "words/" + word, (err, res) => {
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
		let num = Math.floor(Math.random() * 10) + 1;
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
