import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import NavigationBar from "./NavigationBar.jsx";

import { withTracker } from "meteor/react-meteor-data";
import { Container, Grid, Card, Icon, Button } from "semantic-ui-react";

import { Games } from "../lib/games.js";
import { allSearchedWords } from "../api/allSearchedWords.js";
class Gaming extends React.Component {

	renderCards() {
		return this.props.wordsDataSet.map(word => (
			<Card>
				<Card.Content header="Word Definition" />
				<Card.Content> {} </Card.Content>
				<Card.Content extra>
					<Button>1</Button>
					<Button>1</Button>
					<Button>1</Button>
				</Card.Content>
			</Card>
		));
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
	wordsDataSet: 
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

export default withTracker(() => {
	const handle = Meteor.subscribe("games");
	Meteor.subscribe("allSearchedWords");
	let uniqueWords = new Set(allSearchedWords.find({}).fetch());
	let words = [];
	for (var i = 0; i < 10; i++) {
		words.push(uniqueWords.get(i));
	}
	return {
		gameEnded: gameEnded(),
		ready: handle.ready(),

		wordsDataSet: uniqueWords
	};
})(Gaming);
