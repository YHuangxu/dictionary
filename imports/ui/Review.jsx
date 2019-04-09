import React, { Component } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "./NavigationBar.jsx";
import GameRule from "./GameRule.jsx";

export default class Review extends Component {
	render() {
		return (
			<Container textAlign="center">
				<header>
					<NavigationBar className="header" />
				</header>
				<main>
					<GameRule />
				</main>
			</Container>
		);
	}
}