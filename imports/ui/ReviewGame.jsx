import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";

import NavigationBar from "./NavigationBar.jsx";
import PlayGame from "./PlayGame.jsx";

export default class ReviewGame extends React.Component {
	render() {
		return (
			<Container>
				<header>
					<NavigationBar className="header" />
				</header>
				<h1>this is the review Component</h1>

				<Message>
					<Message.Header>How to Play</Message.Header>
					<Message.List>
						<Message.Item>
							Click play button to start a review game
						</Message.Item>
						<Message.Item>
							You will be randomly assigned an opponent
						</Message.Item>
						<Message.Item>
							Each player has 10 words. Game is over the moment one of two players finishes reviewing
						</Message.Item>
						<Message.Item>
							Every word is worth 10 points. The winner will be awarded 100 points.
						</Message.Item>
					</Message.List>
				</Message>

				<Link to="/glossary">Back my Word List</Link>
				<br />

				<PlayGame />
			</Container>
		);
	}
}
