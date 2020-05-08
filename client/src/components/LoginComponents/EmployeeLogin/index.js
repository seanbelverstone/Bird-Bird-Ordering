import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const EmployeeLogin = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default EmployeeLogin;