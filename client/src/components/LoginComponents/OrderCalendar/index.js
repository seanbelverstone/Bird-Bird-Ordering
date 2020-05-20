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
			clickedDate: "",
			totalBiscuits: "",
			currentDate: new Date(),
			currentView: "month",
			currentDateRange: {}
		}
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount = () => {
		// sets the date range right from the get-go
		this.setDateRange();
		// performs an API call to pull all the orders from the database.
		API.getAllOrders().then(response => {

			this.setState({
				rawData: response.data
			}, () => {
				this.sortData();
			})
		})
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
		}, () => {
			this.totalBiscuits();
		});
	}
	
	// adds 30 minutes onto the finishing time, giving us a collection window
	addMinutes = (date, minutes) => {
		return new Date(date.getTime() + minutes*60000)
	}

	handleSelect = (event) => {
		
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

	// Section for calculating the total orders and biscuits. Need the date range in order to do this.
	// Waits for everything else to render, then updates the state for currentDate and currentView
	setCurrentDate = async (date) => {
		await this.setState({
			currentDate: date
		});
		this.setDateRange();
	}

	setCurrentView = async (view) => {
		await this.setState({
			currentView: view
		});
		this.setDateRange();
	}

	setDateRange = () => {
		// Using moment, sets the start and end variables to be tips of the current date, using the current view
		let start = moment(this.state.currentDate).startOf(this.state.currentView);
		let end = moment(this.state.currentDate).endOf(this.state.currentView);
		if (this.state.currentView === "month") {
			start = start.startOf("week");
			end = end.endOf("week");
		}
		this.setState({
			currentDateRange: {
				start: start.toString(),
				end: end.toString()
			}
		});
	}

	// This function gets called after the state has been set for the calendar, and API call has finished. It
	// will display the total number biscuits for the whole month on the top right for easy reading
	totalBiscuits = () => {
		let biscuitQuantity = 0;
		let start = this.state.currentDateRange.start;
		let end = this.state.currentDateRange.end;
		// Converting the start and end into unix for easier comparison
		start = new Date(start).getTime()
		end = new Date(end).getTime();

		this.state.rawData.forEach((element, index) => {
			let elementDateTime = new Date(element.pickupDateTime).getTime();
			console.log(elementDateTime);

			if (elementDateTime >= start && elementDateTime <= end) {
				console.log(element)
				biscuitQuantity = (biscuitQuantity + element.biscuitQuantity)*12
			}
			this.setState({
				totalBiscuits: biscuitQuantity
			})
		})
	}

	// Need to figure out how to access the calendar's view state. If I can do that, I can run a switch
	// case that has like `case calendar.view === week`, only access the events that are within that specified
	// range. 
	// OOH. Maybe do a forEach, that says for each event.pickupDateTime is within the selected time range, 
	// add the quantity to the biscuit quantity variable. 
	// use the selectedTimeRange function to calculate the range



	render() {

		const events = this.state.events;

		return(
			<div>
				<div className="row">
					<div className="col 11">
						<h1>ORDER CALENDAR</h1>
					</div>
					<div className="col 1">
						<div className="orderTotals">
							<div>Orders: {this.state.events.length}</div>
							<div>Total Biscuits: {this.state.totalBiscuits}</div>
						</div>
					</div>
				</div>

				<Calendar
					localizer={localizer}
					events={events}
					views={[Views.DAY, Views.WEEK, Views.MONTH]}
					showMultiDayTimes
					min={new Date(0, 0, 0, 7, 0, 0)}
					max={new Date(0, 0, 0, 16, 0, 0)}
					startAccessor="start"
					endAccessor="end"
					popup={true}
					style={{ height: 500 }}
					onSelectEvent={this.handleSelect}
					date={this.state.currentDate}
					view={this.state.currentView}
					onNavigate={this.setCurrentDate}
					onView={this.setCurrentView}
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