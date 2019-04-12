import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import NavigationBar from "./NavigationBar.jsx";
import GameDescription from "./GameDescription";

import { Button } from "semantic-ui-react";

export default class ChallengeGame extends React.Component {
	handleChallengeClick() {
		this.props.history.push("/challenge/playing");	
	}

	render() {
		return (
			<Container>
				<header>
					<NavigationBar className="header" />
				</header>

				<GameDescription />

				<Link to="/glossary">Back my Word List</Link>
				<br />

				<Button positive onClick={() => this.handleChallengeClick()}>
					Go To Challenge
				</Button>

			</Container>
		);
	}
}

ChallengeGame.propTypes = {
	history: PropTypes.object.isRequired
};
