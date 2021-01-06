import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Table } from "react-bootstrap";
import { DELETE_USER, GET_USERS } from "../../services/User/user.service";
import { Pencil, Trash } from "phosphor-react";
import { useHistory } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import "./user-list.css";
import swal from "sweetalert";

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS, {
    // fetchPolicy: "cache-and-network",
    // ssr: true
    // partialRefetch: true
  });
  //   const [getCurrentUser, { data, loading, error }] = useLazyQuery(getUsers, {fetchPolicy: "cache-and-network" });
  const [deleteUser] = useMutation(DELETE_USER);
  const history = useHistory();

  //   let isMounted = true;
  //   useEffect(() => {
  //     if (isMounted) {
  //       getCurrentUser();
  //     }
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);
  if (loading)
    return (
      <Card className="cardSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Card>
    );
  if (error) return `Error! ${error.message}`;

  const deleteUserData = async (id) => {
    try {
      let deleteUserResult = await deleteUser({
        variables: { id: id },
        optimisticResponse: true,
        // awaitRefetchQueries: true,
        // refetchQueries: [{ query: GET_USERS }],
        update: (cache) => {
          const existingTodos = cache.readQuery({ query: GET_USERS });
          const newTodos = existingTodos.user.filter((t) => t.id !== id);
          cache.writeQuery({
            query: GET_USERS,
            data: { user: newTodos },
          });
        },
      });
      console.log(deleteUserResult);
      swal("Successfully!", "User deleted!", "success");
    } catch (e) {
      console.log(e);
      swal("Failed!", "Delete user request failed!", "error");
    }
  };
  const UserDataList = () => {
    return data.user.map(({ id, name, address }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{address}</td>
          <td>
            <Pencil
              size={25}
              color="#0066ff"
              onClick={() => {
                history.push({
                  pathname: "/update-user",
                  state: { id: id, name: name, address: address },
                });
              }}
            />
          </td>
          <td>
            <Trash
              size={25}
              color="#0066ff"
              onClick={() => {
                deleteUserData(id);
              }}
            />
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <UserDataList />
      </Table>
    </div>
  );
};

export default UserList;
