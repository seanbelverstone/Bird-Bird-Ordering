import React from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css";

let allViews = Object.keys(Views).map(k => Views[k])

const locales = {
  "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

class OrderCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [
				{
					"title": "test",
					"start": new Date(2020, 4, 12, 12, 0, 0, 0),
					"end": new Date(2020, 5, 12, 13, 0, 0, 0),
					"desc": "First order of the day"
				}
			]
		}
	}

	render() {

		const events = this.state.events;

		return(
			<div>
				<h1>ORDER CALENDAR</h1>
				<Calendar
					localizer = {localizer}
					events = {events}
					views = {allViews}
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