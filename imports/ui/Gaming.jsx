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
				{this.props.gameEnded ? "Game End" : "Game playing"}

				<Grid celled centered textAlign="center">
					<Grid.Row>
						<Grid.Column width={4} />

						<Grid.Column width={8}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

Gaming.propTypes = {
	gameEnded: PropTypes.bool.isRequired,
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
	//新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
	var temp_array = new Array();
	for (var index in arr) {
		temp_array.push(arr[index]);
	}
	//取出的数值项,保存在此数组
	var return_array = new Array();
	for (var i = 0; i < num; i++) {
		//判断如果数组还有可以取出的元素,以防下标越界
		if (temp_array.length > 0) {
			//在数组中产生一个随机索引
			var arrIndex = Math.floor(Math.random() * temp_array.length);
			//将此随机索引的对应的数组元素值复制出来
			return_array[i] = temp_array[arrIndex];
			//然后删掉此索引的数组元素,这时候temp_array变为新的数组
			temp_array.splice(arrIndex, 1);
		} else {
			//数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
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

export default withTracker(() => {
	const handle = Meteor.subscribe("games");
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
		ready: handle.ready()
	};
})(Gaming);
