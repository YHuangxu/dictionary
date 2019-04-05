import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

export default class NotFound extends React.Component {
	render() {
		return (
			<div align="center">
				<Image
					centered
					size="large"
					src="/oops.png"
					alt="not found page"
				/>
				<br />
				<div>
					<h1>404 - PAGE NOT Found</h1> <br />
					<h3>
						The page you are looking for might have been removed,
						have its name changed or is temporarily unavailable.
					</h3>
				</div>
				<br /> <Link to="/">Go to Mars</Link>
			</div>
		);
	}
}
