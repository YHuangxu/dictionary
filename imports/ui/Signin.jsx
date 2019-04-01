import React from "react";
import { Meteor } from "meteor/meteor";
import { Button, Segment, Form, Label } from "semantic-ui-react";

export default class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(event) {
		event.preventDefault();

		let username = event.target.username.value.trim();
		let pwd = event.target.password.value.trim();

		Meteor.loginWithPassword({ username: username }, pwd, err => {
			if (err) {
				this.setState({
					error: "Login Failed. Please check username and password."
				});
			} else {
				this.setState({ error: "" });
			}
		});
	}

	render() {
		return (
			<div>
				{this.state.error ? (
					<Label basic color="red" pointing="below" size="large">
						{this.state.error}
					</Label>
				) : (
					undefined
				)}
				<Form
					size="small"
					onSubmit={this.onSubmit.bind(this)}
					noValidate
				>
					<Segment stacked>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							type="text"
							name="username"
							placeholder="Username"
						/>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
						/>

						<Button fluid size="large" id="loginButton">
							Login
						</Button>
					</Segment>
				</Form>
			</div>
		);
	}
}
