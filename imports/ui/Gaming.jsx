import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import NavigationBar from "./NavigationBar.jsx";

import { withTracker } from "meteor/react-meteor-data";
import { Container, Grid, Card, Button } from "semantic-ui-react";

import { Games } from "../lib/games.js";
import { allSearchedWords } from "../api/allSearchedWords.js";

class Gaming extends React.Component {
	handleClick(event) {
		if (event.target.value == "correct answer") {
			// +10
			Meteor.call("updateUserPoints", Meteor.userId(), err => {
				if (err) {
					this.setState({
						error: err.reason
					});

					console.log("Error from meteor.call" + err);
					return;
				}

				console.log("user points updated");

				this.setState({
					error: ""
				});
			});
		}
		// each user can only make one choice
		document.getElementById("choice1").onclick = null;
		document.getElementById("choice2").onclick = null;
		document.getElementById("choice3").onclick = null;
	}

	renderCards() {
		console.log(this.props.questionAndChoices);
		console.log(this.props.questionAndAnswer);
		
		let questionsArray = Array.from(this.props.questionAndChoices.keys());

		if (this.props.ready) {
			return questionsArray.map((key, index) => (
				<Card key={index}>
					<Card.Content header="Word Definition" />
					<Card.Content> {key} </Card.Content>
					<Card.Content extra>
						<Button>
							{this.props.questionAndChoices.get(key)[0]}
						</Button>
						<Button>
							{this.props.questionAndChoices.get(key)[1]}
						</Button>
						<Button>
							{this.props.questionAndChoices.get(key)[2]}
						</Button>
					</Card.Content>
				</Card>
			));
		}
	}

	render() {
		return (
			<Container>
				<NavigationBar />

				<Grid celled centered textAlign="center">
					<Grid.Row>
						<Grid.Column width={4}>
							<div>user1: karen points: 0</div>
						</Grid.Column>
						<Grid.Column width={8}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={4}>
							<div>user2: freddy points: 0</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

Gaming.propTypes = {
	gameEnded: PropTypes.bool.isRequired,
	// users: PropTypes.any.isRequired,
	randomWordsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
	questionAndAnswer: PropTypes.any.isRequired,
	questionAndChoices: PropTypes.any.isRequired,
	ready: PropTypes.bool.isRequired
};

function gameEnded() {
	if (Session.get("inGame")) {
		let myGame = Games.findOne({
			gameStatus: "gameover",
			$or: [{ player1: Meteor.userId() }, { player2: Meteor.userId() }]
		});

		if (myGame !== undefined) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function getRandomArrayElements(arr, num) {
	var temp_array = new Array();
	for (var index in arr) {
		temp_array.push(arr[index]);
	}
	var return_array = new Array();
	for (var i = 0; i < num; i++) {

		if (temp_array.length > 0) {
			var arrIndex = Math.floor(Math.random() * temp_array.length);
			return_array[i] = temp_array[arrIndex];
			temp_array.splice(arrIndex, 1);
		} else {
			break;
		}
	}
	return return_array;
}

function shuffle(arr) {
	for (let i = arr.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
	}
	return arr;
}

function getQuestionsAndAnswers(arr) {
	let questionAndAnswer = new Map();
	arr.forEach(e => {
		questionAndAnswer.set(e.definition, e.word);
	});
	return questionAndAnswer;
}

function getQuestionsAndChoices(arr, uniquewords) {
	let questionAndChoices = new Map();
	arr.forEach(e => {
		let choices = new Set();
		choices.add(e.word);
		while (choices.size < 3) {
			choices.add(
				uniquewords[
					Math.floor(Math.random() * uniquewords.length + 1) - 1
				]
			);
		}

		let shuffleChoices = shuffle(Array.from(choices));

		questionAndChoices.set(e.definition, shuffleChoices);
	});
	return questionAndChoices;
}

// function getUsers() {
// 	let game = Games.findOne({
// 		$and: [
// 			{ gameStatus: "playing" },
// 			{
// 				$or: [
// 					{
// 						player1: Meteor.userId()
// 					},
// 					{
// 						player2: Meteor.userId()
// 					}
// 				]
// 			}
// 		]
// 	});

// 	console.log(game);

// 	if (game !== undefined) {
// 		let user1 = Meteor.users.findOne({ _id: game.player1 }).username;
// 		let user2 = Meteor.users.findOne({ _id: game.player2 }).username;

// 		console.log(user1);
// 		console.log(user2);
// 	}

// 	return game;
// }

export default withTracker(() => {
	const handle = Meteor.subscribe("Games");
	Meteor.subscribe("allSearchedWords");

	let dataSet = allSearchedWords.find({}).fetch();
	let wordsSet = new Set();
	dataSet.forEach(e => wordsSet.add(e.word));

	let randomWordsArray = getRandomArrayElements(dataSet, 10);

	return {
		gameEnded: gameEnded(),
		randomWordsArray: randomWordsArray,
		questionAndAnswer: getQuestionsAndAnswers(randomWordsArray),
		questionAndChoices: getQuestionsAndChoices(
			randomWordsArray,
			Array.from(wordsSet)
		),
		// users: getUsers(),
		ready: handle.ready()
	};
})(Gaming);
