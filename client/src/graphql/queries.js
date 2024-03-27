import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
    query {
        authenticate {
    _id
    email
    username
  }
    }
`

// export const REGISTER_USER = gql``

// export const LOGIN_USER = gql``