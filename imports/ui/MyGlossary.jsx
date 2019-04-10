import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { DefaultList } from "../api/lists";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import {
	Container,
	Grid,
	Button,
	Header,
	Icon,
	Modal
} from "semantic-ui-react";
import "../api/lists";
import NavigationBar from "./NavigationBar.jsx";
import { Link } from "react-router-dom";

class MyGlossary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: "",
			modalOpen: false
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

	// to detect if the user can join a multiplayer challenge game
	handleChallengeClick() {
		const number = this.props.myWords.length;

		if (number < 10) {
			this.setState({
				modalOpen: true
			});
		} else {
			this.props.history.push("/challenge");
		}
	}

	// render all words in the default list
	renderWords() {
		return this.props.myWords.map(word => (
			<Grid.Row key={word._id}>
				<Grid.Column width={3}>{word.word}</Grid.Column>
				<Grid.Column width={8}>
					<hr />
					Defination: {word.content.definition}
					<hr />
					{word.content.example
						? "Example: " + word.content.example
						: undefined}
				</Grid.Column>
				<Grid.Column width={3}>
					Searching: {word.searchTimes}
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
					</Grid>
					<br />
					{this.props.myWords.length === 0 ? (
						<div>
							<p>You have not added words to your list.</p>
							<br />
							<br />
							<br />
							<Link to="/">
								<Button>Back to main</Button>
							</Link>
						</div>
					) : (
						<Button.Group>
							<Modal
								trigger={
									<Button
										positive
										onClick={() => this.handleChallengeClick()}
									>
										Challenge Game
									</Button>
								}
								open={this.state.modalOpen}
							>
								<Header
									icon="info circle"
									content="Word Hard, Play Harder"
								/>
								<Modal.Content>
									<p>
										Your list has less than 10 words. You
										need to review by you own.
									</p>
								</Modal.Content>
								<Modal.Actions>
									<Button
										color="green"
										onClick={() =>
											this.setState({ modalOpen: false })
										}
									>
										<Icon name="checkmark" /> Alright {" "} 😔
									</Button>
								</Modal.Actions>
							</Modal>
							<Button.Or />
							<Link to="/">
								<Button>Back to main</Button>
							</Link>
						</Button.Group>
					)}
				</main>
			</Container>
		);
	}
}

MyGlossary.propTypes = {
	myWords: PropTypes.arrayOf(PropTypes.object).isRequired,
	history: PropTypes.object.isRequired
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
