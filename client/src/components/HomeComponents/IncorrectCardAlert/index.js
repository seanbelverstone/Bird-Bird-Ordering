import React from 'react';
import { Alert } from 'reactstrap';
import "./style.css";

const IncorrectCardAlert = (props) => {

	const hideAlert = () => {
		props.setState({
			errors: false
		});
	}

  return (
    <div>
      <Alert color="danger" isOpen={props.errors} toggle={hideAlert}>
        <h4 className="alert-heading">Card Error</h4>
        <p>
        	There was a problem with your card details.
        </p>
        <hr />
        <p className="mb-0">
			Please check your details and try again.
        </p>
      </Alert>
    </div>
  );
};

export default IncorrectCardAlert;