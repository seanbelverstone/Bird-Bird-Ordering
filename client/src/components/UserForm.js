import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class UserForm extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField name="nameCustomMessage" label="Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
            maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
          }} />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}