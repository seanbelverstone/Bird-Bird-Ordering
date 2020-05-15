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

	componentWillMount = () => {
		API.getAllOrders().then(response => {

			this.setState({
				rawData: response.data
			}, () => {
				this.sortData();
			})
		})
	}

	// adds 30 minutes onto the finishing time, giving us a collection window
	addMinutes = (date, minutes) => {
		return new Date(date.getTime() + minutes*60000)
	}

	// this function fires after the get request has finished
	sortData = () => {
		var unsortedEvents = this.state.rawData

		// loops through the array, and pushes all the necessary data to a new 'events' array, giving it the
		// titles needed to translate into the calendar
		for (var i = 0; i < unsortedEvents.length; i++) {

			this.state.events.push({
				"title": `${unsortedEvents[i].name} #${unsortedEvents[i].id}`,
				"start": new Date(unsortedEvents[i].pickupDateTime),
				// added 30 minutes onto the end time
				"end": this.addMinutes(new Date(unsortedEvents[i].pickupDateTime), 30),
				"desc": `\nQuantity: ${unsortedEvents[i].biscuitQuantity}\n
							Telephone: ${unsortedEvents[i].telephone}\n
							Email: ${unsortedEvents[i].email}\n
							Total: ${unsortedEvents[i].totalCost}\n
							Notes: ${unsortedEvents[i].specialInstructions}`
							
			})
		}
	}

	// need to make a function with componentWillRecieveProps? to check if there's a change in the database. 
	// also need to figure out how to refresh the component when its recieved the data
	// Make it so a popup appears detailing all of the information of the order on click

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