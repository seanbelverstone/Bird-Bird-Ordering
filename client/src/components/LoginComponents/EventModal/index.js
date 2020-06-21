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
		const removedEnd = this.props.pickupTime.replace(`GMT-0500 (Central Daylight Time)`, " ");
		const finalTime = removedEnd.replace(regex, " ");
		return finalTime;
	}

	sortDescription = (desc) => {
		// split the description array up by the space and enters that was jumbling it up
		splitDesc = desc.trim().split(/[\s ↵↵]+/);
		// splits the description array by just where it says Notes, so we can access all of the text after that
		let justNotes = desc.split("Notes: ")

		// I then use interpolation to make it easier to display each item individually.
		let quantity = `${splitDesc[0]} ${splitDesc[1]} dozen - (${splitDesc[1]*12} total)`;
		let jam = `${splitDesc[2]} ${splitDesc[3]}`;
		let gravy = `${splitDesc[4]} ${splitDesc[5]}`;
		let telephone = `${splitDesc[6]} ${splitDesc[7]}`;
		let email = `${splitDesc[8]} ${splitDesc[9]}`;
		let total = `${splitDesc[10]} $${splitDesc[11]}`;
		// index position 12 and 13 are reserved for the Completed part
		let notes = `${splitDesc[14]} ${justNotes[1]}`;

		return (
			<div className="eventData">
				<p>{quantity}</p>
				<p>{jam}</p>
				<p>{gravy}</p>
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