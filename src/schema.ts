import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        users: [User!]!
    }
    
    type Mutation {
        createUser(input: CreateUserInput): User!
    }

    type Subscription {
        userCreated: User
    }

    type User {
        id: ID!
        name: String!
    }
    
    input CreateUserInput {
        name: String!
    }
`