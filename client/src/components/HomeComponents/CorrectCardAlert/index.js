import React from 'react';
import { Alert } from 'reactstrap';
import "../IncorrectCardAlert/style.css";

const CorrectCardAlert = (props) => {

	const hideAlert = () => {
		props.setState({
			showSuccess: false
		});
	}

  return (
    <div>
      <Alert color="success" isOpen={props.showSuccess} toggle={hideAlert}>
        <h4 className="alert-heading">Order Complete!</h4>
        <p>
			Thank you for placing an order {props.name}! An email has been sent to you with all of those important details.
        </p>
        <hr />
        <p className="mb-0">
			We can't wait to see you!
        </p>
      </Alert>
    </div>
  );
};

export default CorrectCardAlert;