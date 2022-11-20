import React from "react";
import DatePicker from "react-datepicker";
// Commented out until returning to full scope of orders.
// import addDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
// import setDate from "date-fns/setDate";
// import setDay from "date-fns/setDay";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; 

const UserCalendar = (props) => {
	return (
		<DatePicker
		id="datePicker"
		selected={props.pickupDateTime}
		onChange={props.handleCalendarChange}
		dateFormat="MMMM d, h:mm aa"
		minDate={new Date(2022, 10, 24)}
		maxDate={new Date(2022, 10, 24)}
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={15}
		timeCaption="Time"
		minTime={setHours(setMinutes(new Date(), 0), 9)}
		maxTime={setHours(setMinutes(new Date(), 0), 12)}
		/>
	);
}

export default UserCalendar;