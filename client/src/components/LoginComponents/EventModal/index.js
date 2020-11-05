import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import format from "date-fns/format";
import CompleteButton from "../CompleteButton";
import "./style.css";

let splitDesc;
const regex = /:\d\d([ ap]|$)/

class EventModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: ""
		}
	}

	sortedTime = () => {
		// quick if statement to replace the unnecessary extra bit at the end of the time.
		let removedEnd = this.props.pickupTime.split(`GMT`);
		const finalTime = removedEnd[0].replace(regex, " ");
		return finalTime;
	}

	sortDescription = (desc) => {
		// split the description array up by the space and enters that was jumbling it up
		splitDesc = desc.trim().split(/[\s ↵↵]+/);

		// I then use interpolation to make it easier to display each item individually.
		let quantity = `${splitDesc[0]} ${splitDesc[1]} 6 pack(s) - (${splitDesc[1]*6} total)`;
		let telephone = `${splitDesc[2]} ${splitDesc[3]}`;
		let email = `${splitDesc[4]} ${splitDesc[5]}`;
		let total = `${splitDesc[6]} $${splitDesc[7]}`;
		// index position 12 and 13 are reserved for the Completed part

		return (
			<div className="eventData">
				<p>{quantity}</p>
				<p>{telephone}</p>
				<p>{email}</p>
				<p>{total}</p>
			</div>
		)

	}

	render() {
		if(!this.props.show) {
			return null;
		}

		return (
			
			<div className="eventModal">
				<Modal isOpen={this.props.show}>
				<ModalHeader className="eventTitle">{this.props.title}</ModalHeader>
				<ModalBody>
					{this.sortDescription(this.props.desc)}
					<br />
					<br />

					Pick Up Date and Time: {format(new Date(this.props.pickupDate), "PPPP")} @ {this.sortedTime()}
				</ModalBody>
				<ModalFooter>
					<CompleteButton orderComplete={splitDesc[13]} title={this.props.title}/>
					<Button color="danger" onClick={this.props.onClose}>Cancel</Button>
				</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default EventModal;
