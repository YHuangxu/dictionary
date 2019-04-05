import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Card, Button, Message, Segment } from "semantic-ui-react";
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
			<Segment.Group stacked>
				<Segment>definition: {this.props.word.definition} </Segment>
				{this.props.word.examples ? (
					<Segment>example: {this.props.word.examples[0]}</Segment>
				) : (
					undefined
				)}
				<Segment>
					{this.state.justSaved ? (
						<Button basic color="red">
							Saved
						</Button>
					) : (
						<Button
							basic
							color="brown"
							onClick={this.handleAddClick.bind(this)}
						>
							Save it to my list
						</Button>
					)}

					{this.state.error && !this.props.user ? (
						<Message negative>
							<p>{this.state.error}</p>
						</Message>
					) : (
						undefined
					)}
				</Segment>
			</Segment.Group>
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
