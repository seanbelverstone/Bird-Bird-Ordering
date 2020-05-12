import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const EmployeeLogin = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="name" name="username" id="username" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Password" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default EmployeeLogin;