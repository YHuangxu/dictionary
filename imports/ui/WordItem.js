import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "semantic-ui-react";

export default class WordItem extends React.Component {
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
						<Button basic color="green">
							Add to my list
						</Button>
						<Button basic color="red">
							Remove from my list
						</Button>
					</div>
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	word: PropTypes.object.isRequired
};
