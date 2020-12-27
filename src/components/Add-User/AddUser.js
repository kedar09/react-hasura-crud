import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Card } from "react-bootstrap";
import "./add-user.css";
import { ADD_USER } from "../../services/User/user.service";

const AddUser = () => {
  const [state, setState] = useState({ name: "", address: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      let addUserResult = await addUser({ variables: state });
      console.log(addUserResult);
      alert("add user successfully");
    } catch (e) {
      console.log(e);
      alert("add user failed");
    }
  };

  return (
    <div className="divAddUser">
      <Card>
        <Card.Header>Add New User</Card.Header>
        <Card.Body>
          <Form className="addUserForm">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={state.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddUser;