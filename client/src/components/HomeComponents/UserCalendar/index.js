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
		minDate={new Date(2023, 10, 22)}
		maxDate={new Date(2023, 10, 23)}
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={15}
		timeCaption="Time"
		minTime={setHours(setMinutes(new Date(), 0), 9)}
		maxTime={setHours(setMinutes(new Date(), 0), props.pickupDateTime < new Date(2023, 10, 23) ? 12 : 11)}
		/>
	);
}

export default UserCalendar;