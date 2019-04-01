import React from "react";
import { Accounts } from "meteor/accounts-base";
import {
	Button,
	Form,
	Segment,
	Label
} from "semantic-ui-react";

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let username = e.target.username.value.trim();
		let email = e.target.email.value.trim();
		let pwd = e.target.password.value.trim();

		if (pwd.length < 8) {
			return this.setState({
				error: "Password must be more than 8 characters."
			});
		}

		Accounts.createUser(
			{
				username: username,
				email: email,
				password: pwd
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
				}
			}
		);
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
							icon="at"
							iconPosition="left"
							type="email"
							name="email"
							placeholder="Email"
						/>
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

						<Button fluid size="large" id="accountButton">
							Sign up
						</Button>
					</Segment>
				</Form>
			</div>
		);
	}
}
