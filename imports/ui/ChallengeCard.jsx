import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
export default class ChallengeCard extends React.Component {
	handleClick() {}

	render() {
		return (
			<div>
				<h2> {this.props.question} </h2>
				<ul>
					<li>
						<Button
							onClick={() => this.handleClick()}
							value={this.props.choice1}
						>
							{this.props.choice1}
						</Button>
					</li>
					<li>
						<Button
							onClick={() => this.handleClick()}
							value={this.props.choice2}
						>
							{this.props.choice2}
						</Button>
					</li>
					<li>
						<Button
							onClick={() => this.handleClick()}
							value={this.props.choice3}
						>
							{this.props.choice3}
						</Button>
					</li>
				</ul>
				<hr />
			</div>
		);
	}
}

ChallengeCard.propTypes = {
	question: PropTypes.string.isRequired,
	choice1: PropTypes.any.isRequired,
	choice2: PropTypes.any.isRequired,
	choice3: PropTypes.any.isRequired,
	onAnswerClicked: PropTypes.func.isRequired
};
