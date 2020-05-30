import React from 'react';
import { Button } from 'reactstrap';
import API from "../../../utils/API";

class CompleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			renderedButton: "",
		}
		this.isOrderComplete = this.isOrderComplete.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
	}

	componentDidMount = () => {
		let id = this.props.title.split("#");
		this.setState({
			id: id[1],
		}, this.isOrderComplete(this.props.orderComplete));
		;
	}

	isOrderComplete = (completedVariable) => {
		console.log(completedVariable);
		parseInt(completedVariable);

		if (completedVariable === 1) {
			this.setState({
				renderedButton: <Button color="warning" onClick={() => this.handleComplete(this.state.id, this.props.orderComplete)}>Mark as Incomplete</Button>,
			})
		} else {
			this.setState({
				renderedButton: <Button color="success" onClick={() => this.handleComplete(this.state.id, this.props.orderComplete)}>Complete Order</Button>,
			});		
		}
	}

	handleComplete = (id, completed) => {
		parseInt(completed);
	// Checks to see if the passed in variable is true or false
	// If true, we want to update the database to reflect the opposite when clicked
		if(completed === 1) {
			this.props.setState({
				orderComplete: 0
			}, this.updateButton(id, completed));
		} else {
			this.props.setState({
				orderComplete: 1
			}, this.updateButton(id, completed));
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
