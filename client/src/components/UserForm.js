import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class UserForm extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="nameCustomMessage" label="Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'},
            pattern: {value: /^[a-zA-Z ]+$/, errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 4, errorMessage: 'Your name must be between 4 and 32 characters'},
            maxLength: {value: 32, errorMessage: 'Your name must be between 4 and 32 characters'}
          }} />
        <AvField name="email" label="Email" type="text" validate={{email: true}} />
		<AvField name="confirmationEmail" label="Confirm email" type="email" validate={{match:{value:'email'}}} />
		<AvField name="telephoneProp" label="Phone" type="text" validate={{tel: true}} />
		<Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}