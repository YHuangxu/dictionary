import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import NavigationBar from "./NavigationBar.jsx";

import { withTracker } from "meteor/react-meteor-data";
import { Container } from "semantic-ui-react";

import { Games } from "../lib/games.js";

class Gaming extends React.Component {
	render() {
		return (
			<Container>
				<NavigationBar />
				{this.props.gameEnded ? "Game End" : "Game playing"}
			</Container>
		);
	}
}

Gaming.propTypes = {
	gameEnded: PropTypes.bool.isRequired
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

	return {
		gameEnded: gameEnded(),
		ready: handle.ready()
	};
})(Gaming);
