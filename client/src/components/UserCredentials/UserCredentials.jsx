import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  FormFeedback,
} from "reactstrap";

const UserCredentials = ({
  credentials,
  handleInputChange,
  handleUserCredentials,
  isInvalid,
}) => {
  return (
    <Form onSubmit={handleUserCredentials}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          id="exampleEmail"
          placeholder="forgetful@what.com"
          invalid={isInvalid}
        />
        <FormFeedback>User already exists with that email!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          id="examplePassword"
          placeholder="$EcReTPa$$wOrD"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

UserCredentials.propTypes = {
  credentials: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleUserCredentials: PropTypes.func,
  isInvalid: PropTypes.bool
};

export default UserCredentials;
