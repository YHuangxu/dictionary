import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import Login from "./Login.jsx";
import { Accounts } from "meteor/accounts-base";

export default class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.loginRef = React.createRef();
	}

	onLogout() {
		Accounts.logout();
	}

	handleClick() {
		this.loginRef.current.openModal();
	}

	render() {
		return (
			<Menu secondary>
				<Menu.Item name="logo" />
				<Menu.Item name="type.js" />

				<Menu.Menu position="right">
					<Menu.Item>
						<Button onClick={this.handleClick.bind(this)}>Log In</Button>
						<Login ref={this.loginRef}/>
					</Menu.Item>
					<Menu.Item>
						<Dropdown
							text={
								Meteor.user()
									? "User: " + Meteor.user().username
									: "Please log in"
							}
						>
							<Dropdown.Menu>
								<Dropdown.Item icon="folder" text="My Lists" />
								<Dropdown.Divider />
								<Dropdown.Item
									icon="log out"
									text="Log Out"
									onClick={this.onLogout.bind(this)}
								/>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
