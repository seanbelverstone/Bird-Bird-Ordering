import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import format from "date-fns/format";
import CompleteButton from "../CompleteButton";
import "./style.css";
import UserCalendar from '../../HomeComponents/UserCalendar';
import API from '../../../utils/API';
import PaymentLoader from '../../HomeComponents/PaymentLoader';
import biscuit from '../../../images/solobiscuit.png';

let splitDesc;
const regex = /:\d\d([ ap]|$)/

class EventModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: "",
			editDateTime: false,
			pickupDateTime: '',
			loading: false,
			showAlert: false,
			updateSuccessful: false,
			alertMessage: ''
		}
	}

	componentDidUpdate (prevProps) {
		const { fullDateTime } = this.props;
		if (prevProps.fullDateTime !== fullDateTime) {
			this.setState({
				pickupDateTime: fullDateTime
			})
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
		// index position 8 and 9 are reserved for the Completed part

		return (
			<div className="eventData">
				<p>{quantity}</p>
				<p>{telephone}</p>
				<p>{email}</p>
				<p>{total}</p>
			</div>
		)

	}

	displayEditModal = () => {
		const { editDateTime } = this.state;
		this.setState({
			editDateTime: !editDateTime
		})
	}

	handleCalendarChange = date => {
		this.setState({
			pickupDateTime: date
		});
	  };

	submitDateTimeUpdate = () => {
		const { pickupDateTime } = this.state;
		const id = this.props.title.split('#')[1];
		this.setState({
			loading: true
		});
		API.updateComplete(id, 'pickupDateTime', pickupDateTime)
		.then(response => {
			console.log(response);
			if (response.status === 200) {
				this.setState({
					loading: false,
					showAlert: true,
					updateSuccessful: true,
					alertMessage: 'Pickup Date/Time successfully updated. Closing this message will refresh the page.'
				})
			} else {
			   this.setState({
					loading: false,
					showAlert: true,
					updateSuccessful: false,
					alertMessage: 'There was an issue updating this order. Please contact support to resolve the issue.'
			   })
			}
		});
	}

	hideAndRefresh = () => {
		this.state.updateSuccessful
			? window.location.reload()
			: this.setState({
				showAlert: false,
				alertMessage: ''
			});
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
				<ModalFooter style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<div id="buttons" style={{ display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'flex-end', width: '100%', marginBottom: '1em' }}>
						<Button color="primary" onClick={this.displayEditModal} disabled={this.state.updateSuccessful}>{this.state.editDateTime ? 'Hide Edit' : 'Edit'}</Button>
						<CompleteButton orderComplete={splitDesc[13]} title={this.props.title} disabled={this.state.updateSuccessful}/>
						<Button color="danger" onClick={this.props.onClose} disabled={this.state.updateSuccessful}>Cancel</Button>
					</div>
					{this.state.editDateTime && (
						<div style={{ display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'flex-end', width: '100%' }}>
							<UserCalendar pickupDateTime={this.state.pickupDateTime || this.props.fullDateTime}
							handleCalendarChange={this.handleCalendarChange}
							disabled={this.state.updateSuccessful}
							/>
							<Button color="warning" onClick={this.submitDateTimeUpdate} disabled={new Date(this.state.pickupDateTime).getTime() === new Date(this.props.fullDateTime).getTime() || this.state.loading || this.state.updateSuccessful}>Update Date/Time</Button>
						</div>
					)}
					<div style={{ width: '100%' }}>
						<PaymentLoader loading={this.state.loading} />
					</div>
					<Alert color={this.state.updateSuccessful ? "success" : "danger"} isOpen={this.state.showAlert} toggle={this.hideAndRefresh} style={{ padding: '1em', marginBottom: '2em' }}>
						<h4 className="alert-heading">{this.state.updateSuccessful ? 'Update Successful' : 'Error'}</h4>
						<p className="mb-0">
							<img src={biscuit} alt="a single biscuit" className="leftBiscuit"/>
								{this.state.alertMessage}
							<img src={biscuit} alt="a single biscuit" className="rightBiscuit"/>
						</p>
					</Alert>
				</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default EventModal;
