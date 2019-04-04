import React, { Component } from "react";
import Typed from "typed.js";
import PropTypes from "prop-types";

export default class TypingAnimation extends Component {
	componentDidMount() {
		// If you want to pass more options as props, simply add
		// your desired props to this destructuring assignment.
		const { typingContent } = this.props;
		// You can pass other options here, such as typing speed, back speed, etc.
		const options = {
			strings: typingContent,
			typeSpeed: 50,
			backSpeed: 50,
			loop: true,
			smartBackspace: true
		};
		// this.el refers to the <span> in the render() method
		this.typed = new Typed(this.el, options);
	}

	componentWillUnmount() {
		// Make sure to destroy Typed instance on unmounting
		// to prevent memory leaks
		this.typed.destroy();
	}

	render() {
		return (
			<div className="wrap">
				<div className="type-wrap">
					<span
						style={{ whiteSpace: "pre" }}
						ref={el => {
							this.el = el;
						}}
					/>
				</div>
			</div>
		);
	}
}

TypingAnimation.propTypes = {
	typingContent: PropTypes.string.isRequired
};
