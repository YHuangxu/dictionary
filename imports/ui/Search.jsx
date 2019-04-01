import React from "react";
import { Input } from "semantic-ui-react";
import RegisterModal from "./RegisterModal.jsx";
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}
	render() {
		return (
			<div>
				<Input 
					fluid 
					icon="search" 
					placeholder="Search..."
				/>
				<RegisterModal />
			</div>
		);
	}
}
