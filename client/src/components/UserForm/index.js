import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const UserForm = (props) => {

    return (
      <AvForm onSubmit={props.handleSubmit}>
        <AvField name="nameCustomMessage" label="Name" type="text" validate={{
            required: {value: true, errorMessage: 'Please enter a name'},
            pattern: {value: /^[a-zA-Z ]+$/, errorMessage: 'Your name must be composed only with letter and numbers'},
            minLength: {value: 4, errorMessage: 'Your name must be between 4 and 32 characters'},
            maxLength: {value: 32, errorMessage: 'Your name must be between 4 and 32 characters'}
          }} />

        <AvField name="telephoneProp" label="Phone" type="text" validate={{
          tel: true,
          required: {value: true, errorMessage: 'Please enter a phone number'}}} />

        <AvField name="email" label="Email" type="text" validate={{
          email: true,
          required: {value: true, errorMessage: 'Please enter an email address.'}}} />

		    <AvField name="confirmationEmail" label="Confirm email" type="email" validate={{
          match:{value:'email', errorMessage: 'Email does not match'},
          required: {value: true, errorMessage: 'Please re-enter your email.'}}} />

      </AvForm>
    );
  }

export default UserForm;