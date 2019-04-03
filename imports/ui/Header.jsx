import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import ReactModalLogin from "react-modal-login";
import { Accounts } from "meteor/accounts-base";

export default class MenuExampleSizeSmall extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			loggedIn: null,
			loading: false,
			initialTab: null,
			error: ""
		};
	}

	onLogout() {
		Accounts.logout();
	}

	onLogin() {
		console.log("__onLogin__");
		console.log(
			"username: " + document.querySelector("#username").value.trim()
		);
		console.log(
			"password: " + document.querySelector("#password").value.trim()
		);

		const username = document.querySelector("#username").value.trim();
		const password = document.querySelector("#password").value.trim();

		Meteor.loginWithPassword({ username: username }, password, err => {
			if (err) {
				this.setState({
					error: "Login Failed. Please check username and password."
				});
			} else {
				this.setState({ error: "" });
				this.onLoginSuccess("form");
			}
		});
	}

	onRegister() {
		console.log("__onRegister__");
		console.log("username: " + document.querySelector("#username").value);
		console.log("email: " + document.querySelector("#email").value);
		console.log("password: " + document.querySelector("#password").value);

		const username = document.querySelector("#username").value.trim();
		const email = document.querySelector("#email").value.trim();
		const password = document.querySelector("#password").value.trim();

		if (password.length < 8) {
			return this.setState({
				error: "Password must be more than 8 characters."
			});
		}

		Accounts.createUser(
			{
				username: username,
				email: email,
				password: password
			},
			err => {
				if (err) {
					this.setState({
						error: err.reason
					});
				} else {
					this.setState({
						error: ""
					});
					this.onLoginSuccess("form");
				}
			}
		);
	}

	openModal(initialTab) {
		this.setState(
			{
				initialTab: initialTab
			},
			() => {
				this.setState({
					showModal: true
				});
			}
		);
	}

	onLoginSuccess(method, response) {
		this.closeModal();
		this.setState({
			loggedIn: method,
			loading: false
		});
	}

	onLoginFail(method, response) {
		this.setState({
			loading: false,
			error: response
		});
	}

	startLoading() {
		this.setState({
			loading: true
		});
	}

	finishLoading() {
		this.setState({
			loading: false
		});
	}

	afterTabsChange() {
		this.setState({
			error: null
		});
	}

	closeModal() {
		this.setState({
			showModal: false,
			error: null
		});
	}

	// { Meteor.user() ? "User: " + Meteor.user().username : "Please log in" }

	render() {
		return (
			<Menu secondary>
				<Menu.Item name="logo" />
				<Menu.Item name="type.js" />

				<Menu.Menu position="right">
					<Menu.Item>
						<Button onClick={() => this.openModal()}>Sign In</Button>

						<ReactModalLogin
							visible={this.state.showModal}
							onCloseModal={this.closeModal.bind(this)}
							loading={this.state.loading}
							error={this.state.error}
							tabs={{
								afterChange: this.afterTabsChange.bind(this)
							}}
							loginError={{
								label: this.state.error
							}}
							registerError={{
								label: this.state.error
							}}
							startLoading={this.startLoading.bind(this)}
							finishLoading={this.finishLoading.bind(this)}
							form={{
								onLogin: this.onLogin.bind(this),
								onRegister: this.onRegister.bind(this),

								loginBtn: {
									label: "Sign in"
								},
								registerBtn: {
									label: "Sign up"
								},

								loginInputs: [
									{
										containerClass: "RML-form-group",
										label: "Username",
										type: "text",
										inputClass: "RML-form-control",
										id: "username",
										name: "username",
										placeholder: "Username"
									},
									{
										containerClass: "RML-form-group",
										label: "Password",
										type: "password",
										inputClass: "RML-form-control",
										id: "password",
										name: "password",
										placeholder: "Password"
									}
								],
								registerInputs: [
									{
										containerClass: "RML-form-group",
										label: "Username",
										type: "text",
										inputClass: "RML-form-control",
										id: "username",
										name: "username",
										placeholder: "Username"
									},
									{
										containerClass: "RML-form-group",
										label: "Email",
										type: "email",
										inputClass: "RML-form-control",
										id: "email",
										name: "email",
										placeholder: "Email"
									},
									{
										containerClass: "RML-form-group",
										label: "Password",
										type: "password",
										inputClass: "RML-form-control",
										id: "password",
										name: "password",
										placeholder: "Password"
									}
								]
							}}
						/>
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
