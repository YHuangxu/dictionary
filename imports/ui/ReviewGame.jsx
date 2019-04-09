import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import NavigationBar from "./NavigationBar.jsx";
import GameDescription from "./GameDescription";

import PlayGame from "./PlayGame.jsx";

export default class ReviewGame extends React.Component {
	render() {
		return (
			<Container>
				<header>
					<NavigationBar className="header" />
				</header>

				<GameDescription />

				<Link to="/glossary">Back my Word List</Link>
				<br />

				<PlayGame />
			</Container>
		);
	}
}
