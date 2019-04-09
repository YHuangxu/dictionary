import React, { Component } from "react";
import { Header, List, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default class GameRule extends Component {
	constructor(props) {
		super(props);
	}
	handleClick(event) {
		Meteor.call("defaultList.remove", event.target.id, err => {
			if (err) {
				this.setState({
					error: err.reason
				});

				console.log("Error from meteor.call" + err);
				return;
			}

			console.log("Word removed");

			this.setState({
				error: ""
			});
		});
	}

	render() {
		return (
			<div>
				<Grid columns={3} divided>
					<Grid.Row>
						<Grid.Column>
							<Header as="h1">Review by Gaming Rule</Header>
							<List bulleted>
								<List.Item>Gaining Access</List.Item>
								<List.Item>Inviting Friends</List.Item>
								<List.Item>
									Benefits
									<List.List>
										<List.Item>Rebates</List.Item>
										<List.Item>Discounts</List.Item>
									</List.List>
								</List.Item>

								<Button.Group>
									<Button onClick={this.handleClick.bind(this)}>Review</Button>
									<Button.Or />
									<Link to="/">
										<Button positive>Back</Button>
									</Link>
								</Button.Group>
							</List>
						</Grid.Column>
						<Grid.Column />
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}
