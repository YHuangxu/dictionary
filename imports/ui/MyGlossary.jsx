import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { DefaultList } from "../api/lists";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Container, Grid, Button } from "semantic-ui-react";
import "../api/lists";
import NavigationBar from "./NavigationBar.jsx";
import { Link } from "react-router-dom";

class MyGlossary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	// remove word from list
	handleClick(event) {
		Meteor.call("defaultList.remove", event.target.id, err => {
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

	// render all words in the default list
	renderWords() {
		return this.props.myWords.map(word => (
			<Grid.Row key={word._id}>
				<Grid.Column width={2}>{word.word}</Grid.Column>
				<Grid.Column width={12}>
					defination: {word.content.definition}
					<br />
					{word.content.example ? word.content.example : undefined}
				</Grid.Column>
				<Grid.Column width={2}>
					<Button id={word._id} onClick={this.handleClick.bind(this)}>
						Remove
					</Button>
				</Grid.Column>

			</Grid.Row>
		));
	}

	render() {
		return (
			<Container textAlign="center">
				<header>
					<NavigationBar />
				</header>
				<br />
				<main>
					<Grid columns="two" divided>
						{this.renderWords()}
					</Grid><br/>
					<Link to="/">Back</Link>
				</main>
			</Container>
		);
	}
}

MyGlossary.propTypes = {
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
})(MyGlossary);
