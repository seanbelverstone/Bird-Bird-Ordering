import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EventModal extends React.Component {

	sortDescription = (desc) => {
		let splitDesc = desc.split(/[\s ↵↵]+/);
		let joinedDesc = splitDesc.join(" ");

		console.log(joinedDesc);
		return joinedDesc;
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