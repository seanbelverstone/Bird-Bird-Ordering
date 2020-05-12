import React from 'react';
import EventCalendar from "react-event-calendar";

const events = [
	{
		start: "2020-05-12",
		end: "2020-05-12",
		title: "test",
		description: "testing out this event calendar"
	}
]

class OrderCalendar extends React.Component {

	render() {
		return(
			<div>
				<h1>ORDER CALENDAR</h1>
				<EventCalendar
					month={5}
					year={2020}
					events={events}
					onEventClick={(target, eventData, day) => {console.log(eventData)}}
					/>
			</div>

		)
	}

}


export default OrderCalendar;