import React, {useState, useEffect} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Table } from "react-bootstrap";
import { DELETE_USER, getUsers } from "../../services/User/user.service";
import { Pencil, Trash } from "phosphor-react";
import { useHistory } from 'react-router-dom';

const UserList = (props) => {
  const { loading, error, data } = useQuery(getUsers);
  const [deleteUser] = useMutation(DELETE_USER);
  const history = useHistory();
  // const [loadingUserData, setLoadingUserData] = useState(false);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const deleteUserData = async(id) => {
    try {
      let deleteUserResult = await deleteUser({ variables: {id: id} });;
      console.log(deleteUserResult);
      alert("delete user successfully");
    } catch (e) {
      console.log(e);
      alert("delete user failed");
    } 
  }

  const UserDataList = () => {
    return data.user.map(({ id, name, address }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{address}</td>
          <td><Pencil size={25} color="#0066ff" onClick={()=>{history.push({pathname: '/update-user',state: {id: id, name: name, address: address}})}} /></td>
          <td><Trash size={25} color="#0066ff" onClick={()=>{deleteUserData(id)}} /></td>
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
