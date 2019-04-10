import React from "react";
import { Message } from "semantic-ui-react";

export default class GameDescription extends React.Component {
	render() {
		return (
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
						Each player has 10 words, and game is over the moment whoever finishes reviewing
					</Message.Item>
					<Message.Item>
						Every word is worth 10 points. The winner will be awarded
						100 points
					</Message.Item>
				</Message.List>
			</Message>
		);
	}
}
