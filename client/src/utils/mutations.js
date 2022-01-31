import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($id: ID!) {
    saveBook(_id: $ID) {
      _id
      authors
      description
      bookId
      title
      bookId
      image
      link
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($skill: String!) {
    removeBook(skill: $skill) {
      _id
      name
      skills
    }
  }
`;
