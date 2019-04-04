import React from "react";
import { Meteor } from "meteor/meteor";
import { Container } from "semantic-ui-react";

import NavigationBar from "./NavigationBar.jsx";
import SearchBar from "./Search.jsx";

import WordsList from "./WordsList";
import "../api/wordsAPI";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchWord: "",
<<<<<<< HEAD
			words: []
=======
			words: [],
			error: ""
>>>>>>> 5b49d19ac35395b15c2cf414611bf40c374a3846
		};
	}

	onSearchSubmit(word) {
		Meteor.call("getData", "words/" + word, (err, res) => {
			if (err) {
				this.setState({  searchWord: "", words:[], error: "Word not found"});
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
		return (
			<Container>
				<NavigationBar />

				<h1>LOGO PLACE!</h1>

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
