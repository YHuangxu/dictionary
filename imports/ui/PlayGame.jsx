import React from "react";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Games } from "../api/games.js";

class PlayGame extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isReady: false,
			status: "Click play to start!"
		};
	}

	handleClick() {
		console.log("play button has been clicked!");
		Session.set("inGame", true);

		Meteor.call("games.play");
		// Meteor.subscribe("MyGame");
	}

	render() {
		return (
			<Container>
				<Button onClick={this.handleClick.bind(this)}>Play!</Button>
				<div>
					<span>Game Status</span> : <span>{this.props.status}</span>
				</div>
			</Container>
		);
	}
}

function setStatus() {
	if (Session.get("inGame")) {
		let newGame = Games.findOne();

		if (newGame !== undefined) {
			if (newGame.GameStatus === "waiting") {
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

PlayGame.propTypes = {
	status: PropTypes.string
};

export default withTracker(() => {
	return {
		status: setStatus()
	};
})(PlayGame);
