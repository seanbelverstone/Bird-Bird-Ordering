import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EventModal extends React.Component {

	sortDescription = (desc) => {
		// split the description array up by the space and enters that was jumbling it up
		let splitDesc = desc.trim().split(/[\s ↵↵]+/);
		let justNotes = desc.split("Notes: ")

		console.log(splitDesc);

		// I then use interpolation to make it easier to display each item individually.
		let quantity = `${splitDesc[0]} ${splitDesc[1]}`;
		let telephone = `${splitDesc[2]} ${splitDesc[3]}`;
		let email = `${splitDesc[4]} ${splitDesc[5]}`;
		let total = `${splitDesc[6]} ${splitDesc[7]}`;
		let notes = `${splitDesc[8]} ${justNotes[1]}`;

		return (
			<div className="eventData">
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
				<ModalHeader className="eventTitle">{this.props.title}</ModalHeader>
				<ModalBody>
					{this.sortDescription(this.props.desc)}
					<br />
					<br />

					Pick Up Date and Time: {this.props.pickupDate} @ {this.props.pickupTime}
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