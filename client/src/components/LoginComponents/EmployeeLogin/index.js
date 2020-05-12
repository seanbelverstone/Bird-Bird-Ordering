import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./style.css";

class EmployeeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
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
    event.preventDefault();
    //if the username & password match the env file, set the parent's state of loggedIn to true 
    if (this.state.username === process.env.REACT_APP_EMPLOYEE_USERNAME && this.state.password === process.env.REACT_APP_EMPLOYEE_PASSWORD) {
      this.props.setState({
        loggedIn: true,
      })
      this.setState({
        errorMessage: ""
      })
    } else {
      this.props.setState({
        loggedIn: false
      })
      this.setState({
        errorMessage: "Your username or password is incorrect."
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
        <div id="errorMessage">{this.state.errorMessage}</div>
      </Form>
    );
  }
}

export default EmployeeLogin;