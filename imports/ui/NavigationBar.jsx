import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import Login from "./Login.jsx";
import { Accounts } from "meteor/accounts-base";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedin: false
		};
		this.loginRef = React.createRef();
	}

	onLogout() {
		Accounts.logout();
	}

	handleClick() {
		this.loginRef.current.openModal();
	}

	displayLogin() {
		return (
			<Menu.Item>
				<Button onClick={this.handleClick.bind(this)}>Log In</Button>
				<Login ref={this.loginRef} />
			</Menu.Item>
		);
	}

	displayDropdown() {
		return (
			<Menu.Item>
				<Dropdown
					text={
						Meteor.user()
							? "User: " + Meteor.user().username
							: "Please log in"
					}
				>
					<Dropdown.Menu>
						<Link to="/glossary"><Dropdown.Item icon="folder" text="My Lists" /></Link>
						<Dropdown.Divider />
						<Dropdown.Item
							icon="log out"
							text="Log Out"
							onClick={this.onLogout.bind(this)}
						/>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		);
	}

	render() {
		return (
			<Menu secondary>
				<Menu.Item name="logo" />
				<Menu.Item name="type.js" />

				<Menu.Menu position="right">
					{Meteor.user() ? "" : this.displayLogin()}
					{this.props.user ? this.displayDropdown() : ""}
				</Menu.Menu>
			</Menu>
		);
	}
}

// Below are two ways to get the value of Meteor.user()
// 1.
NavigationBar.propTypes = {
	user: PropTypes.bool.isRequired
};
//2.
export default withTracker(() => {
	return {
		user: !!Meteor.user()
	};
})(NavigationBar);
