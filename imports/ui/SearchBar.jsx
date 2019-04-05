import React from "react";
import PropTypes from "prop-types";
import { Input, Form, Grid } from "semantic-ui-react";

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: "",
			isOpen: false
		};
	}

	onFormSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this.state.word);
	}

	render() {
		return (
			<Grid centered>

				<Grid.Column width={10}>
					<Form onSubmit={this.onFormSubmit.bind(this)}>
						<Form.Field>
							<Input
								id="searchBar"
								value={this.state.word}
								onChange={e =>
									this.setState({ word: e.target.value })
								}
								fluid
								icon="search"
								placeholder="Search..."
							/>
						</Form.Field>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

SearchBar.propTypes = {
	onSubmit: PropTypes.func.isRequired
};
