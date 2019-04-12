import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Container, Button, Table, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar.jsx";

class WinnerBoard extends React.Component {
	renderUserData() {
		console.log(this.props.userdata);

		return this.props.userdata.map(user => (
			<Table.Body key={user._id}>
				{user.profile.points > 0 ? (
					<Table.Row>
						<Table.Cell>{user.username}</Table.Cell>

						<Table.Cell>{user.profile.points}</Table.Cell>
					</Table.Row>
				) : (
					undefined
				)}
			</Table.Body>
		));
	}

	render() {
		return (
			<Container textAlign="center">
				<header>
					<NavigationBar className="header" />
					<Image src="/winner1.png" alt="winner board" size="large" centered/>
					<br />
				</header>

				<main>
					<Grid centered columns="equal">
						<Grid.Column width={10}>
							<Table striped textAlign="center">
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>
											User
										</Table.HeaderCell>
										<Table.HeaderCell>
											Points
										</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								{this.renderUserData()}
							</Table>
							<br />
						</Grid.Column>
					</Grid>
					<Link to="/">
						<Button color="blue">Back to main</Button>
					</Link>
				</main>
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
