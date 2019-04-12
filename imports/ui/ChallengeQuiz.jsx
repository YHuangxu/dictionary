import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

import NavigationBar from "./NavigationBar.jsx";
import Quiz from "./Quiz.jsx";
import Result from "./Quiz.jsx";

import { withTracker } from "meteor/react-meteor-data";

import { Questions } from "../api/Questions.js";
import { Games } from "../lib/games.js";
import { DefaultList } from "../api/lists";

import { Container, Button } from "semantic-ui-react";

class ChallengeQuiz extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			questionId: 1,
			question: "",
			answerOptions: [],
			answer: "",
			points: 0,
			questionTotal: 10,
			result: ""
		};

		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.questions.length !== prevProps.questions.length) {
			// shuffle options
			const shuffledAnswerOptions = this.props.questions.map(question =>
				this.shuffleArray(question.options)
			);
			this.setState({
				question: this.props.questions[0].question, // the first question
				answerOptions: shuffledAnswerOptions[0] // the first group of options
			});
		}
	}

	shuffleArray(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	handleAnswerSelected(event) {
		this.setUserAnswer(event.currentTarget.value);

		if (this.state.questionId < this.state.questionTotal) {
			setTimeout(() => this.setNextQuestion(), 300);
		} else {
			setTimeout(() => this.setResults(), 300);
		}
	}

	setResults() {
		this.setState({ result: "You got " + this.state.points + " points!" });
	}

	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
			counter: counter,
			questionId: questionId,
			question: this.props.questions[counter].question,
			answerOptions: this.props.questions[counter].options,
			answer: ""
		});
	}

	setUserAnswer(answer) {
		if (answer === "true") {
			this.setState({
				points: this.state.points + 10
			});
		}

		this.setState({
			answer: answer
		});
	}

	renderQuiz() {
		return (
			<Quiz
				question={this.state.question}
				questionId={this.state.questionId}
				answerOptions={this.state.answerOptions}
				answer={this.state.answer}
				questionTotal={this.state.questionTotal}
				onAnswerSelected={this.handleAnswerSelected}
			/>
		);
	}

	renderResult() {
		return <Result quizResult={this.state.result} />;
	}

	handleClick() {
		Session.set("inGame", true);
		Meteor.call("game.play");
		Meteor.subscribe("MyGame");
	}

	render() {
		return (
			<Container>
				<NavigationBar />
				<div>
					<Button positive onClick={this.handleClick.bind(this)}>
						Play!
					</Button>
					<span>Game Status</span> : <span>{this.props.status}</span>
				</div>

				<hr />

				{this.state.result}

				{this.props.gameStarted ? (
					this.renderQuiz()
				) : (
					undefined
				)}
				
			</Container>
		);
	}
}

ChallengeQuiz.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.object).isRequired,
	status: PropTypes.string,
	gameStarted: PropTypes.bool,
	myWords: PropTypes.arrayOf(PropTypes.object).isRequired,
	ready: PropTypes.bool.isRequired
};

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

function gameStarted() {
	if (Session.get("inGame")) {
		let myGame = Games.findOne({
			gameStatus: "playing",
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

function setStatus() {
	if (Session.get("inGame")) {
		let newGame = Games.findOne({
			$or: [{ player1: Meteor.userId() }, { player2: Meteor.userId() }]
		});

		if (newGame !== undefined) {
			if (newGame.gameStatus === "waiting") {
				return "Waiting for an opponent...";
			} else if (newGame.gameStatus === "playing") {
				return "Game playing...";
			} else if (newGame.gameStatus === "gameover") {
				if (newGame.gameWinner === Meteor.userId()) {
					return "You win!";
					// return points!
				} else if (newGame.gameWinner !== Meteor.userId()) {
					return "You lost!";
					//return points1
				} else if (newGame.gameWinner === "tie") {
					return "Tie";
				}
			}
		} else {
			return "Click play to start!";
		}
	} else {
		return "Click play to start!";
	}
}

export default withTracker(() => {
	Meteor.subscribe("Games");
	Meteor.subscribe("defaultList");

	const handle = Meteor.subscribe("Questions");
	let questions = Questions.find({}).fetch();

	let randomQuestions = getRandomArrayElements(questions, 10);

	return {
		questions: randomQuestions,
		status: setStatus(),
		gameStarted: gameStarted(),
		myWords: DefaultList.find({
			userId: Meteor.userId()
		}).fetch(),
		ready: handle.ready()
	};
})(ChallengeQuiz);
