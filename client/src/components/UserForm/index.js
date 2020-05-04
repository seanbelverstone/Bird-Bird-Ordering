import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CheckoutForm from "../CheckoutForm";


class UserForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {[name]: value}
		)
  };

  render() {
    return (
      <div>
        <AvForm>
          <AvField name="name" label="name" type="text" onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter a name'},
              pattern: {value: /^[a-zA-Z ]+$/, errorMessage: 'Your name must be composed only with letter and numbers'},
              minLength: {value: 4, errorMessage: 'Your name must be between 4 and 32 characters'},
              maxLength: {value: 32, errorMessage: 'Your name must be between 4 and 32 characters'}
            }} />

          <AvField name="telephone" label="telephone" type="text" onChange={this.handleChange} validate={{
            tel: true,
            required: {value: true, errorMessage: 'Please enter a phone number'}}} />

          <AvField name="email" label="email" type="text" onChange={this.handleChange} validate={{
            email: true,
            required: {value: true, errorMessage: 'Please enter an email address.'}}} />

          <AvField name="confirmationEmail" label="Confirm email" type="email" validate={{
            match:{value:'email', errorMessage: 'Email does not match'},
            required: {value: true, errorMessage: 'Please re-enter your email.'}}} />

        </AvForm>

        <div>
          <CheckoutForm total={this.props.total}/>
        </div>
      </div>

    );
  }
}

export default UserForm;