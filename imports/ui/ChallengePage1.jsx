import React from "react";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import NavigationBar from "./NavigationBar.jsx";
import GameDescription from "./GameDescription";

import { DefaultList } from "../api/lists";

import { Container, Button, Modal, Header, Icon } from "semantic-ui-react";

class ChallengeGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}

	handleChallengeClick() {
		if (this.props.myWords.length < 10) {
			this.setState({
				modalOpen: true
			});
		} else {
			this.props.history.push("/challenge/playing");
		}
	}

	modalCheck() {
		return (
			<Modal
				trigger={
					<Button.Group>
						<Button
							positive
							onClick={() => this.handleChallengeClick()}
						>
							Go To Challenge
						</Button>
						<Button.Or />
						<Link to="/glossary">
							{" "}
							<Button>Back my Word List</Button>
						</Link>
					</Button.Group>
				}
				open={this.state.modalOpen}
			>
				<Header icon="info circle" content="Word Hard, Play Harder" />
				<Modal.Content>
					<p>
						Your list has less than 10 words. Add more to your list
						to join the challenge game.
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Link to="/">
						<Button
							color="green"
							onClick={() => this.setState({ modalOpen: false })}
						>
							<Icon name="checkmark" /> OK
						</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		);
	}

	render() {
		return (
			<Container textAlign="center">
				<header>
					<NavigationBar className="header" />
				</header>

				<main>
					<GameDescription />
					<br />
					{this.modalCheck()}
				</main>
			</Container>
		);
	}
}

ChallengeGame.propTypes = {
	history: PropTypes.object.isRequired,
	myWords: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	Meteor.subscribe("defaultList");

	return {
		myWords: DefaultList.find({
			userId: Meteor.userId()
		}).fetch()
	};
})(ChallengeGame);
