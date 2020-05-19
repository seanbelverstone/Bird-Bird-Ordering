import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment";
import API from "../../../utils/API";
import EventModal from "../EventModal";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const list = [];

class OrderCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: [],
			events: [],
			clicked: false,
			clickedTitle: "",
			clickedDesc: "",
			clickedTime: "",
			clickedDate: ""
		}
		this.handleSelect = this.handleSelect.bind(this);
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

	// adds 30 minutes onto the finishing time, giving us a collection window
	addMinutes = (date, minutes) => {
		return new Date(date.getTime() + minutes*60000)
	}

	// this function fires after the get request has finished
	sortData = () => {
		var unsortedEvents = this.state.rawData

		// loops through the array, and pushes all the necessary data to a new 'list' array, giving it the
		// titles needed to translate into the calendar. Had to push to a global const variable as pushing 
		// directly to an array in state is bad practice.
		for (var i = 0; i < unsortedEvents.length; i++) {

			list.push({
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
		this.setState(state => {
			// then using concat(), update the events state object to trigger a re-render
			const events = state.events.concat(list);
			return {
				events,
			}
		})
	}

	handleSelect = (event) => {
		console.log(event);
		
		this.setState({
			clickedTitle: event.title,
			clickedDesc: event.desc,
			clickedTime: event.start.toTimeString(),
			clickedDate: event.start.toDateString()
		})
		this.toggleModal();
	}

	toggleModal = () => {
		this.setState({
			clicked: !this.state.clicked
		})
	}

	// need to make a function with componentWillRecieveProps? to check if there's a change in the database. 
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
					onSelectEvent={this.handleSelect}
					/>

				<EventModal 
					show={this.state.clicked} 
					onClose={this.toggleModal}
					title={this.state.clickedTitle}
					desc={this.state.clickedDesc}
					pickupTime={this.state.clickedTime}
					pickupDate={this.state.clickedDate}
					/>

			</div>

		)
	}

}


export default OrderCalendar;