import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { DefaultList } from "../api/lists";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

class MyGlossary extends Component {

	render() {
		return (
			this.props.myWords.map(word => (
				<div key={word._id}>{word.content.word}</div>))
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
