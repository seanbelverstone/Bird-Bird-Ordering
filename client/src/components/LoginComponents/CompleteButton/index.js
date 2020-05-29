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

	componentDidMount = () => {
			let id = this.props.title.split("#");
			this.setState({
				id: id[1]
			}, () => {
				API.getOneOrder(this.state.id)
				.then(response => {
                                        //When this returns, setState of trueOrFalse to equal response.data[1]
					this.setState({
                                            trueOrFalse: response.data[1]
                                        },
                                        console.log(response.data);
					this.isOrderComplete(this.state.trueOrFalse));
			})
		});

	}

	isOrderComplete = (completedVariable) => {
		parseInt(completedVariable);
		console.log(completedVariable);
		
		switch(completedVariable === 1) {
			case true:
				this.setState({
					renderedButton: <Button color="warning" onClick={() => this.handleComplete(this.state.id, completedVariable)}>Mark as Incomplete</Button>,
				})
				break;
			default:
				this.setState({
					renderedButton: <Button color="success" onClick={() => this.handleComplete(this.state.id, completedVariable)}>Complete Order</Button>,
				});		
				break;		
		}
	}

	handleComplete = (id, completed) => {
// Checks to see if the passed in variable is true or false
// If true, we want to update the database to reflect the opposite when clicked
                if(completed === 1) {
                   this.setState({
                       trueOrFalse: 0
                   )};
                } else {
                   this.setState{(
                       trueOrFalse: 1
                   });
                }
		API.updateComplete(id, this.state.trueOrFalse)
		.then(response => {

			this.isOrderComplete(response.data[0]);
			API.getAllOrders();
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
