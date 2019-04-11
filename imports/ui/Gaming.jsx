import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import NavigationBar from "./NavigationBar.jsx";

import { withTracker } from "meteor/react-meteor-data";
import { Container, Grid, Card, Icon, Button } from "semantic-ui-react";

import { Games } from "../lib/games.js";
import { allSearchedWords } from "../api/allSearchedWords.js";
import { users } from "../api/updatePoints.js";
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
		// return this.props.wordsDataSet.map(word => (
		// 	<Card>
		// 		<Card.Content header="Word Definition" />
		// 		<Card.Content> {} </Card.Content>
		// 		<Card.Content extra>
		// 			<Button id="choice1" onClick={() => this.handleClick()}>1</Button>
		// 			<Button id="choice2" onClick={() => this.handleClick()}>1</Button>
		// 			<Button id="choice3" onClick={() => this.handleClick()}>1</Button>
		// 		</Card.Content>
		// 	</Card>
		// ));
	}

	render() {
		return (
			<Container>
				<NavigationBar />
				{this.props.gameEnded ? "Game End" : "Game playing"}

				<Grid celled centered textAlign="center">
					<Grid.Row>
						<Grid.Column width={4}>
							<div>
								user1: {this.props.user1.username}
								points: {this.props.user1.points}
							</div>
						</Grid.Column>
						<Grid.Column width={8}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={4}>
							<div>
								user2: {this.props.user1.username}
								points: {this.props.user1.points}
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

Gaming.propTypes = {
	gameEnded: PropTypes.bool.isRequired,
	user1: PropTypes.object.isRequired,
	user2: PropTypes.object.isRequired
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
	Meteor.subscribe("users");

	Meteor.subscribe("allSearchedWords");
	let uniqueWords = new Set(allSearchedWords.find({}).fetch());

	let user1 = users.find({_id: Games.player1});
	let user2 = users.find({_id: Games.player2});

	// let points1 = user1.points;
	// let points2 = user2.points;

	// let username1 = user1.username;
	// let username2 = user2.username;

	return {
		gameEnded: gameEnded(),
		ready: handle.ready(),
		wordsDataSet: uniqueWords,
		user1: user1,
		user2: user2
	};
})(Gaming);
