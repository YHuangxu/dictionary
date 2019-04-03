import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

export default class WordItem extends React.Component {

	render() {
		return (
			<Card>
				<Card.Content>
					<Card.Header> DEFINITION: {this.props.word.definition} </Card.Header>
					<Card.Description> EXAMPLE: {this.props.word.examples ? this.props.word.examples[0] : undefined} </Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

WordItem.propTypes = {
	word: PropTypes.object.isRequired
};
