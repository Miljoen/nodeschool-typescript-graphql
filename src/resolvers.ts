import { pubSub } from './pub-sub'
import { users } from './graphql/queries/users'
import { createUser } from './graphql/mutations/create-user'
import { GraphQLInput, UserInput } from './types'

export const resolvers = {
    Query: {
        users() {
            return users()
        },
    },
    Mutation: {
        createUser(_: undefined, { input }: GraphQLInput<UserInput>) {
            return createUser(input)
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
        },
    },
}