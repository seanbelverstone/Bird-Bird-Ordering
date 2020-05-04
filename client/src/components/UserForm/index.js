import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CheckoutForm from "../CheckoutForm";


class UserForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      name: "",
      email: "",
      telephone: ""
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
          <AvField name="name" label="Name" type="text" onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter a name'},
              pattern: {value: /^[a-zA-Z ]+$/, errorMessage: 'Your name must be composed only with letter and numbers'},
              minLength: {value: 4, errorMessage: 'Your name must be between 4 and 32 characters'},
              maxLength: {value: 32, errorMessage: 'Your name must be between 4 and 32 characters'}
            }} />

          <AvField name="telephone" label="Telephone" type="text" onChange={this.handleChange} validate={{
            tel: true,
            required: {value: true, errorMessage: 'Please enter a phone number'}}} />

          <AvField name="email" label="Email" type="text" onChange={this.handleChange} validate={{
            email: true,
            required: {value: true, errorMessage: 'Please enter an email address.'}}} />

          <AvField name="confirmationEmail" label="Confirm email" type="email" validate={{
            match:{value:'email', errorMessage: 'Email does not match'},
            required: {value: true, errorMessage: 'Please re-enter your email.'}}} />

        </AvForm>

        <div>
          <CheckoutForm toggleClose={this.props.toggleClose}
                        total={this.props.total}
                        specialInstructions={this.props.specialInstructions}
                        pickupDateTime={this.props.pickupDateTime}
                        quantity={this.props.quantity}
                        name={this.state.name}
                        email={this.state.email}
                        telephone={this.state.telephone}
                        />
        </div>
      </div>

    );
  }
}

export default UserForm;