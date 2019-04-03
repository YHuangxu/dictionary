import React from "react";
import PropTypes from "prop-types";
import { Input, Form } from "semantic-ui-react";
import RegisterModal from "./RegisterModal.jsx";

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
			<div>
				<Form onSubmit={this.onFormSubmit.bind(this)}>
					<Form.Field>
						<label>Search a word</label>
						<Input
							value={this.state.word}
							onChange={e => this.setState({word: e.target.value})}
							fluid
							icon="search"
							placeholder="Search..."
						/>
					</Form.Field>
				</Form>

				<RegisterModal />
			</div>
		);
	}
}

SearchBar.propTypes = {
	onSubmit: PropTypes.func.isRequired
};
