import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Card } from "react-bootstrap";
import "./add-user.css";
import { ADD_USER, GET_USERS } from "../../services/User/user.service";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const AddUser = () => {
  const history = useHistory();
  const [state, setState] = useState({ name: "", address: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      let addUserResult = await addUser({
        variables: state,
        optimisticResponse: true,
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GET_USERS }],
      });
      console.log(addUserResult);
      //   swal("");
      swal("Successfully!", "New user added!", "success");
      history.push("/", { updateData: true });
      // window.location.reload();
    } catch (e) {
      console.log(e);
      swal("Failed!", "Add new user request failed!", "error");
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
