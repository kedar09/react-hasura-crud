import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation($name: String!, $address: String!) {
    insert_user(objects: { name: $name, address: $address }) {
      affected_rows
      returning {
        id
        name
        address
      }
    }
  }
`;

export const getUsers = gql`
query {
  user {
    id
    name
    address
  }
}
`;

export const UPDATE_USER = gql`
mutation($id: Int!, $name: String!, $address: String!) {
  update_user(
    where: { id: { _eq: $id } }
    _set: { name: $name, address: $address }
  ) {
    affected_rows
  }
}
`;

export const DELETE_USER = gql`
  mutation($id: Int!) {
    delete_user(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;