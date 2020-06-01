import React from 'react';
import { Button } from 'reactstrap';
import API from "../../../utils/API";

class CompleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			renderedButton: "",
			trueOrFalse: ""
		}
		this.isOrderComplete = this.isOrderComplete.bind(this);
	}

	componentWillMount = () => {
		this.isOrderComplete(this.props.orderComplete);
		let id = this.props.title.split("#");
		this.setState({
			id: id[1],
			trueOrFalse: parseInt(this.props.orderComplete)
		});
	}

	isOrderComplete = (completedVariable) => {
		console.log(completedVariable);

		if(completedVariable === 1) {
			this.setState({
				renderedButton: <Button color="warning" onClick={this.handleComplete}>Mark as Incomplete</Button>,
			})
		} else {
			this.setState({
				renderedButton: <Button color="success" onClick={this.handleComplete}>Complete Order</Button>,
			});		
		}
	}

	handleComplete = () => {
	// Checks to see if the passed in variable is true or false
	// If true, we want to update the database to reflect the opposite when clicked
		if(this.state.trueOrFalse === 1) {
			this.setState({
				trueOrFalse: 0
			}, this.updateButton(this.state.id, this.state.trueOrFalse));
		} else {
			this.setState({
				trueOrFalse: 1
			}, this.updateButton(this.state.id, this.state.trueOrFalse));
		}
	}


	updateButton = (id, completed) => {
		API.updateComplete(id, completed)
		.then(response => {
			console.log(response);
			this.isOrderComplete(parseInt(response.data[0]));
		});
	}

	render() {	
		return (
			<div>
				{this.state.renderedButton}
			</div>
			);
		}
}

export default CompleteButton;