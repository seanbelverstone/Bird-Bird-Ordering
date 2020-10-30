import React from "react";
import DatePicker from "react-datepicker";
// Commented out until returning to full scope of orders.
// import addDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setDate from "date-fns/setDate";
import setDay from "date-fns/setDay";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; 

const UserCalendar = (props) => {

	return (
		<DatePicker
		id="datePicker"
		selected={props.pickupDateTime}
		onChange={props.handleCalendarChange}
		dateFormat="MMMM d, h:mm aa"
		// min date makes sure users can't select a date sooner than the day before Thanksgiving
		minDate={new Date(2020, 10, 25)}
		// when going back to full range, use addDays(new Date(), 2) as this will prevent users from selecting a day earlier than 2 days from now.
		// max date does the same, but for orders after thanksgiving day
		maxDate={new Date(2020, 10, 26)}
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={15}
		timeCaption="Time"
		minTime={setHours(setMinutes(new Date(), 0), 9)}
		maxTime={setHours(setMinutes(new Date(), 0), 11)}
		/>
	);
}

export default UserCalendar;