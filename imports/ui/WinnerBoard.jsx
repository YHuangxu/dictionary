import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Grid, Container } from "semantic-ui-react";

class WinnerBoard extends React.Component {
	renderUserDate() {
		console.log(this.props.userdata);

		return this.props.userdata.map(user => (
			<div key={user._id}>
				<div>{user.username}</div>
				<div>{user.profile.points}</div>
			</div>
		));
	}

	render() {
		return (
			<Container>
				<div>WinnerBoard!</div>
				<Grid centered>{this.renderUserDate()}</Grid>
			</Container>
		);
	}
}

WinnerBoard.propTypes = {
	userdata: PropTypes.arrayOf(PropTypes.object).isRequired,
	ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("userData");

	return {
		userdata: Meteor.users
			.find(
				{},
				{
					sort: {
						"profile.points": -1
					}
				}
			)
			.fetch(),
		ready: handle.ready()
	};
})(WinnerBoard);
