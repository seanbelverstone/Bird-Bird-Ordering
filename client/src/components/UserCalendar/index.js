import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; 

const UserCalendar = (props) => {

	return (
		<DatePicker
		id="datePicker"
		selected={props.pickupDateTime}
		onChange={props.handleCalendarChange}
		dateFormat="MMMM d, h:mm aa"
		// min date makes sure users can't select a date sooner than 2 days from the current day
		minDate={subDays(new Date(), -2)}
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={15}
		timeCaption="Time"
		// the min/max time reflect Bird Bird Biscuit's weekday opening hours
		minTime={setHours(setMinutes(new Date(), 0), 8)}
		maxTime={setHours(setMinutes(new Date(), 0), 14)}
		/>
	);
}

export default UserCalendar;