import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Card, Button, Message } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import { DefaultList } from "../api/lists";

class WordItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justAdded: this.props.added,
			error: ""
		};
	}

	handleAddClick() {
		if (this.props.user) {
			console.log("user loggedin!");
			this.setState({ justAdded: true });

			let content = {
				word: this.props.searchWord,
				definition: this.props.word.definition,
				example: this.props.word.examples
			};

			console.log(content);

			Meteor.call("defaultList.insert", content, err => {
				if (err) {
					this.setState({
						error: err.reason
					});

					console.log("Error from meteor.call" + err);
					return;
				}

				console.log("Word inserted");

				this.setState({
					error: ""
				});
			});
		} else {
			this.setState({ error: "You need to log in first." });
		}
	}

	handleRemoveClick() {
		this.setState({ justAdded: false });

		Meteor.call("defaultList.remove", this.props.word.definition, err => {
			if (err) {
				this.setState({
					error: err.reason
				});

				console.log("Error from meteor.call" + err);
				return;
			}

			console.log("Word removed");

			this.setState({
				error: ""
			});
		});
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

					{this.state.justAdded ? (
						<Button
							basic
							color="red"
							onClick={this.handleRemoveClick.bind(this)}
						>
							Remove from my list
						</Button>
					) : (
						<Button
							basic
							color="green"
							onClick={this.handleAddClick.bind(this)}
						>
							Add to my list
						</Button>
					)}
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	searchWord: PropTypes.string.isRequired,
	added: PropTypes.bool.isRequired,
	word: PropTypes.object.isRequired,
	user: PropTypes.bool.isRequired,
	myWords: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("defaultList");

	return {
		user: !!Meteor.user(),
		myWords: DefaultList.find({
			userId: Meteor.userId()
		}).fetch(),
		ready: handle.ready()
	};
})(WordItem);
