import React from "react";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Games } from "../api/games.js";

class PlayGame extends React.Component {

	handleClick() {
		console.log("Play button has been clicked!!!!!");
		Session.set("inGame", true);

		Meteor.call("game.play");
		// Meteor.subscribe("MyGame");
	}

	render() {
		return (
			<Container>
				<Button onClick={this.handleClick.bind(this)}>Play!</Button>
				<div>
					<span>Game Status</span> : <span>{this.props.status}</span>
				</div>

				{this.props.gameStarted ? (
					<h4>game started!</h4>
				) : (
					<h4>Game not start</h4>
				)}
			</Container>
		);
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

PlayGame.propTypes = {
	status: PropTypes.string,
	gameStarted: PropTypes.bool
};

export default withTracker(() => {
	const handle = Meteor.subscribe("games");

	return {
		status: setStatus(),
		gameStarted: gameStarted(),
		ready: handle.ready()
	};
})(PlayGame);
