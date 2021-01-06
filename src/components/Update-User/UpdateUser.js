import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GET_USERS, UPDATE_USER } from "../../services/User/user.service";
import { Form, Button, Card } from "react-bootstrap";
import "./update-user.css";
import { useHistory } from "react-router-dom";

const UpdateUser = (props) => {
  const [state, setState] = useState({ id: "", name: "", address: "" });
  const [updateUser] = useMutation(UPDATE_USER);
  const history = useHistory();

  useEffect(() => {
    setState({
      ...state,
      id: props.location.state.id,
      name: props.location.state.name,
      address: props.location.state.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let updateUserResult = await updateUser({
        variables: state,
        optimisticResponse: true,
        awaitRefetchQueries: true,
        // update: (cache) => {
        //     const existingUsers = cache.readQuery({query: getUsers});
        //     const newTodos = existingUsers.user.map(t => {
        //         if (t.id === state.id) {
        //             return {...t, name: state.name, address: state.address };
        //         } else {
        //             return t;
        //         }
        //     });
        //     cache.writeQuery({
        //         query: getUsers,
        //         data: {todos: newTodos}
        //     });
        // }
        refetchQueries: [{ query: GET_USERS }],
      });
      console.log(updateUserResult);
      alert("update user successfully");
      history.push("/");
    } catch (e) {
      console.log(e);
      alert("update user failed");
    }
  };

  return (
    <div className="updateUserDiv">
      <Card>
        <Card.Header>Update User</Card.Header>
        <Card.Body>
          <Form className="updateUserForm">
            <Form.Group controlId="formBasicID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={state.id}
                disabled={true}
                onChange={handleChange}
                placeholder="Enter id"
              />
            </Form.Group>
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

            <Button
              variant="primary"
              className="updateUserSubmitButton"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateUser;
