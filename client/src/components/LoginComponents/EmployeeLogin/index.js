import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EmployeeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {[name]: value}
		)
  };

  handleSubmit(event) {
    if (this.state.username === process.env.REACT_APP_EMPLOYEE_USERNAME && this.state.password === process.env.REACT_APP_EMPLOYEE_PASSWORD) {
      this.props.setState({
        loggedIn: true
      })
    } else {
      this.props.setState({
        loggedIn: false
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="name" 
                 name="username" 
                 id="username" 
                 placeholder="Username" 
                 onChange={this.handleChange}/>

        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" 
                 name="password" 
                 id="password" 
                 placeholder="Password" 
                 onChange={this.handleChange}/>
                 
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default EmployeeLogin;