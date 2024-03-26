import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        _id
        email
        username
    }
    }
`

export const LOGOUT_USER = gql`
    mutation Mutation {
  logoutUser {
    message
  }
}
`

export const REGISTER_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        registerUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
        }
    }

`