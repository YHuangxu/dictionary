import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Card, Button, Message } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";

class WordItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justAdded: false,
			error: ""
		};
	}

	handleClick() {
		if (this.props.user) {
			console.log("user loggedin!");
			this.setState({ error: "" });
			// call meteor method

			// add word to list
		} else {
			this.setState({ error: "You need to log in first." });
		}
	}

	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>
						{" "}
						DEFINITION: {this.props.word.definition}{" "}
					</Card.Header>
					<Card.Description>
						{" "}
						EXAMPLE:{" "}
						{this.props.word.examples
							? this.props.word.examples[0]
							: undefined}{" "}
					</Card.Description>
				</Card.Content>

				<Card.Content extra>
					{this.state.error && !this.props.user ? (
						<Message negative>
							<p>{this.state.error}</p>
						</Message>
					) : (
						undefined
					)}

					<Button
						basic
						color="green"
						onClick={this.handleClick.bind(this)}
					>
						Add to my list
					</Button>
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	word: PropTypes.object.isRequired,
	user: PropTypes.bool.isRequired
};

export default withTracker(() => {
	return {
		user: !!Meteor.user()
	};
})(WordItem);
