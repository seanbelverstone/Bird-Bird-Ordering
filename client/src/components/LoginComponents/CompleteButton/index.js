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
		this.updateButton = this.updateButton.bind(this);
	}

	componentDidMount = () => {
		this.isOrderComplete(this.props.orderComplete);
		let id = this.props.title.split("#");
		this.setState({
			id: id[1]
		});
	}

	isOrderComplete = (completedVariable) => {
		if(parseInt(completedVariable) === 1) {
			this.setState({
				trueOrFalse: 0,
				renderedButton: <Button color="warning" onClick={() => this.updateButton()} disabled={this.props.disabled}>Mark as Incomplete</Button>
			});
		} else {
			this.setState({
				trueOrFalse: 1,
				renderedButton: <Button color="success" onClick={() => this.updateButton()} disabled={this.props.disabled}>Complete Order</Button>		
			});
		}
		return;
	}

	updateButton = () => {

		API.updateComplete(this.state.id, 'completed', this.state.trueOrFalse)
		.then(response => {
			console.log(response);
			this.setState({
				trueOrFalse: response.data.completed
			}, this.isOrderComplete(this.state.trueOrFalse));
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