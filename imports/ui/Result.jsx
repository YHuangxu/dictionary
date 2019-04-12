import React from "react";
import PropTypes from "prop-types";

class Result extends React.Component {
	render() {
		return (
			<div>
				<h2>Result Component</h2>
				<strong>{this.props.quizResult}</strong>!
			</div>
		);
	}
}

Result.propTypes = {
	quizResult: PropTypes.string.isRequired
};

export default Result;
