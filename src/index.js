const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const resolvers = require ('./resolvers')

const { endpoint, origin, playground, secret } = require('./config')

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint,
      secret
    }),
    prisma
  })
})

server.start({
  playground,
  cors: {
    origin
  }
}).then(() => console.log('Serve running on http://localhost:4000...'))
// id cjtj4ajxx00dn0850y54wgghi