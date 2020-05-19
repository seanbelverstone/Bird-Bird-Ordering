import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EventModal extends React.Component {

	sortDescription = (desc) => {
		// split the description array up by the space and enters that was jumbling it up
		let splitDesc = desc.split(/[\s ↵↵]+/);
		let justNotes = desc.split("Notes: ")

		// I then use interpolation to make it easier to display each item individually.
		let quantity = `${splitDesc[1]} ${splitDesc[2]}`;
		let telephone = `${splitDesc[3]} ${splitDesc[4]}`;
		let email = `${splitDesc[5]} ${splitDesc[6]}`;
		let total = `${splitDesc[7]} ${splitDesc[8]}`;
		let notes = `${splitDesc[9]} ${justNotes[1]}`;

		return (
			<div>
				<p>{quantity}</p>
				<p>{telephone}</p>
				<p>{email}</p>
				<p>{total}</p>
				<p>{notes}</p>
			</div>
		)
	}


	render() {
		if(!this.props.show) {
			return null;
		}

		return (
			
			<div>
				<Modal isOpen={this.props.show}>
				<ModalHeader>{this.props.title}</ModalHeader>
				<ModalBody>
					{this.sortDescription(this.props.desc)}
					<br />
					<br />

					Pick Up Date and Time: {this.props.pickupDateTime}
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.props.onClose}>Cancel</Button>
				</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default EventModal;