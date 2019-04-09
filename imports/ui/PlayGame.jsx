import React from "react";
import { Session } from "meteor/session";

import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";


export default class PlayGame extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isReady: false,
			status: "Click play to start!"
		};
	}

	handleClick() {
		Session.set("inGame", true);
		// Meteor.call("games.play");
		// Meteor.subscribe("MyGame");
	}

	render() {
		return (
			<Container>
				<Button onClick={this.handleClick.bind(this)}>Play!</Button>
				<div>
					<span>Game Status</span> :{" "}
					<span> {this.state.status} </span>
				</div>
			</Container>
		);
	}
}


