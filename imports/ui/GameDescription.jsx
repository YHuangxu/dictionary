import React from "react";
import { Message } from "semantic-ui-react";

export default class GameDescription extends React.Component {
	render() {
		return (
			<Message>
				<Message.Header>How to Chanllenge Yourself</Message.Header>
				<Message.List>
					<Message.Item>
						Click play button to start challenging yourself
					</Message.Item>
					<Message.Item>
						You will be randomly assigned an opponent
					</Message.Item>
					<Message.Item>
						You will be given 10 words picked randomly from all
						searching records
					</Message.Item>
					<Message.Item>
						Game is over the moment whoever finishes to answer the
						questions
					</Message.Item>
					<Message.Item>
						Every word is worth 10 points. The winner will be
						awarded 100 points
					</Message.Item>
				</Message.List>
			</Message>
		);
	}
}
