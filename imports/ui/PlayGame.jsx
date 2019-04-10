import React from "react";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Container, Button, Modal, Header, Icon } from "semantic-ui-react";
import { Games } from "../api/games.js";
import { DefaultList } from "../api/lists";
import { Link } from "react-router-dom";

class PlayGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}

	// to detect if the user can join a multiplayer review game
	handleClick() {
		if (this.props.myWords.length < 10) {
			this.setState({
				modalOpen: true
			});
		} else {
			console.log("Play button has been clicked!!!!!");
			Session.set("inGame", true);
			Meteor.call("game.play");
			// Meteor.subscribe("MyGame");
		}
	}

	render() {
		return (
			<Container>
				<Modal
					trigger={
						<Button positive onClick={this.handleClick.bind(this)}>
							Play!
						</Button>
					}
					open={this.state.modalOpen}
				>
					<Header
						icon="info circle"
						content="Word Hard, Play Harder"
					/>
					<Modal.Content>
						<p>
							Your list has less than 10 words. Do you want to
							review by you own?
						</p>
					</Modal.Content>
					<Modal.Actions>
						<Link to="/glossary">
							<Button
								color="green"
								onClick={() =>
									this.setState({ modalOpen: false })
								}
							>
								<Icon name="checkmark" /> Yes
							</Button>
						</Link>
						<Button
							color="red"
							onClick={() => this.setState({ modalOpen: false })}
						>
							<Icon name="remove" /> No
						</Button>
					</Modal.Actions>
				</Modal>
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
			console.log("newGame.gameStatus: " + newGame.gameStatus);

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

		console.log("gameStarted function. " + myGame);

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
	gameStarted: PropTypes.bool,
	myWords: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("games");
	Meteor.subscribe("defaultList");

	return {
		status: setStatus(),
		gameStarted: gameStarted(),
		ready: handle.ready(),

		myWords: DefaultList.find({
			userId: Meteor.userId()
		}).fetch()
	};
})(PlayGame);
