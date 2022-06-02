import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import dotenv from 'dotenv'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { resolvers } from './resolvers'
import { readFileSync } from 'fs'
import path from 'path'

dotenv.config()
main()

async function main() {
    const app = express()
    const httpServer = createServer(app)

    const typeDefs = readFileSync(path.resolve(__dirname, './graphql/schema.graphql')).toString('utf-8')

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const server = new ApolloServer({ schema })

    await server.start()

    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath },
    )

    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log(`🚀 HTTP server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
        console.log(`🚀 Websocket server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
    })
}
