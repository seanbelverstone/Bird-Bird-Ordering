import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment";
import API from "../../../utils/API";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class OrderCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: [],
			events: []
		}
	}

	componentDidMount = () => {
		API.getAllOrders().then(response => {

			this.setState({
				rawData: response.data
			}, () => {
				this.sortData();
			})
		})
	}

	sortData = () => {
		var unsortedEvents = this.state.rawData
		for (var i = 0; i < unsortedEvents.length; i++) {

			console.log(unsortedEvents[i].pickupDateTime);

			this.state.events.push({
				"title": `${unsortedEvents[i].name} #${unsortedEvents[i].id}`,
				"start": new Date(unsortedEvents[i].pickupDateTime),
				"end": new Date(unsortedEvents[i].pickupDateTime),
				"desc": `\nQuantity: ${unsortedEvents[i].biscuitQuantity}\n
							Telephone: ${unsortedEvents[i].telephone}\n
							Email: ${unsortedEvents[i].email}\n
							Total: ${unsortedEvents[i].totalCost}\n
							Notes: ${unsortedEvents[i].specialInstructions}`
							
			})
		}
		console.log(this.state.events);
	}
	// onComponentDidMount, do a pull request to grab all the database data.
	// Check that the collection date is in the right format. Also to make the month date 1 less than it is,
	// due to the note above about months being in an array format starting at 0
	// push to this.state.events
	// make sure that the message goes into the description
	// Add a popup for the order
	// Make the title the name and amount(?)

	render() {

		const events = this.state.events;

		return(
			<div>
				<h1>ORDER CALENDAR</h1>
				<Calendar
					localizer = {localizer}
					events = {events}
					views = {[Views.DAY, Views.WEEK, Views.MONTH]}
					showMultiDayTimes
					startAccessor = "start"
					endAccessor = "end"
					popup = {true}
					style = {{ height: 500 }}
					/>
			</div>

		)
	}

}


export default OrderCalendar;