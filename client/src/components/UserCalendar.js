import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class UserCalendar extends React.Component {
	state = {
		startDate: new Date()
	  };
	 
	  handleChange = date => {
		this.setState({
		  startDate: date
		});
	  };
	 
	  render() {
		return (
		  <DatePicker
			selected={this.state.startDate}
			onChange={this.handleChange}
			minDate={subDays(new Date(), -2)}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={15}
			timeCaption="Time"
			minTime={setHours(setMinutes(new Date(), 0), 7)}
			maxTime={setHours(setMinutes(new Date(), 0), 14)}
			/>
		);
	  }
	}

export default UserCalendar;