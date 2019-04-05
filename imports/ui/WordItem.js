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
			error: "",
			justSaved: false
		};
	}

	handleAddClick() {
		if (this.props.user) {
			this.setState({ justSaved: true });
			setTimeout(() => this.setState({ justSaved: false }), 1000);

			let word = this.props.searchWord;
			let content = {
				definition: this.props.word.definition,
				example: this.props.word.examples
					? this.props.word.examples[0]
					: undefined
			};

			Meteor.call("defaultList.insert", word, content, err => {
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

	render() {
		return (
			<Card fluid className="hvr-grow-shadow">
				<Card.Content>
					<Card.Description>
						{" "}
						DEFINITION: {this.props.word.definition}{" "}
					</Card.Description>
					<Card.Description>
						{this.props.word.examples
							? this.props.word.examples[0]
							: undefined}{" "}
					</Card.Description>
				</Card.Content>

				<Card.Content extra>
					{/*show error message*/}
					{this.state.error && !this.props.user ? (
						<Message negative>
							<p>{this.state.error}</p>
						</Message>
					) : (
						undefined
					)}

					{/*show save/saved button*/}
					{this.state.justSaved ? <Button
						basic
						color="red"
					>
						Saved
					</Button> : <Button
						basic
						color="green"
						onClick={this.handleAddClick.bind(this)}
					>
						Save it to my list
					</Button>}
					
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	searchWord: PropTypes.string.isRequired,
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
