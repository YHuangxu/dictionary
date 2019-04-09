import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import NavigationBar from "./NavigationBar.jsx";

export default class ReviewGame extends React.Component {

	render() {
		return (
			<Container>
				<header>
					<NavigationBar className="header" />
				</header>
				<h1>this is the review Component</h1>

				<Link to="/glossary">Back my Word List</Link><br/>
			</Container>
		);
	}
}

