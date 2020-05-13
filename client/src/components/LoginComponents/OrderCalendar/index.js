import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class OrderCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [
				{
					// NOTES: Months are in an array format, going from 0 - 11
					"title": "test",
					"start": new Date(2020, 4, 12, 12, 0, 0, 0),
					"end": new Date(2020, 4, 12, 13, 0, 0, 0),
					"desc": "First order of the day"
				}
			]
		}
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