import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

export default class RegisterModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Modal>
				<Modal.Header>Select a Photo</Modal.Header>
				<Modal.Content image>
					<Image
						wrapped
						size="medium"
						src="/images/avatar/large/rachel.png"
					/>
					<Modal.Description>
						<Header>Default Profile Image</Header>
						<p>
							Weve found the following gravatar image associated
							with your e-mail address.
						</p>
						<p>Is it okay to use this photo?</p>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}
