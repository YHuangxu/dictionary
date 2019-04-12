import React from "react";
import PropTypes from "prop-types";

class Result extends React.Component {
	render() {
		return (
			<div>
				<strong>{this.props.quizResult}</strong>!
			</div>
		);
	}
}

Result.propTypes = {
	quizResult: PropTypes.string.isRequired
};

export default Result;
