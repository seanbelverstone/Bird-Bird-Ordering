import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
 

class UserCalendar extends React.Component {
	state = {
		startDate: new Date()
	  };
	 
	  handleChange = date => {
		this.setState({
		  startDate: date
		});
	  };

	  componentDidMount() {
		this.setState({
			startDate: subDays(new Date(), -2)
		})
	  }

	  render() {
		return (
		  <DatePicker
			id="datePicker"
			selected={this.state.startDate}
			onChange={this.handleChange}
			dateFormat="MMMM d, h:mm aa"
			// min date makes sure users can't select a date sooner than 2 days from the current day
			minDate={subDays(new Date(), -2)}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={15}
			timeCaption="Time"
			// the min/max time reflect Bird Bird Biscuit's weekday opening hours
			minTime={setHours(setMinutes(new Date(), 0), 7)}
			maxTime={setHours(setMinutes(new Date(), 0), 14)}
			/>
		);
	  }
	}

export default UserCalendar;