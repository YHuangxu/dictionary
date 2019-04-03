import React from "react";
import PropTypes from "prop-types";
import Login from "./Login.jsx";
import { Meteor } from "meteor/meteor";
import { Card, Button } from "semantic-ui-react";

export default class WordItem extends React.Component {
	constructor(props) {
		super(props);
		this.loginRef = React.createRef();
	}

	handleClick() {
		if (Meteor.userId()) {
			console.log("user loggedin!");
		} else {
			this.loginRef.current.openModal();
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
					<div className="ui two buttons">
						<Button basic color="green"  onClick={this.handleClick.bind(this)}>
							Add to my list
						</Button>
						
						
						<Button basic color="red">
							Remove from my list
						</Button>

						<Login ref={this.loginRef}/>
					</div>
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	word: PropTypes.object.isRequired
};
