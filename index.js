const { ApolloServer } = require('apollo-server'),
      typeDefs = require('./graphql/typeDefs'),
      resolvers = require('./graphql/resolvers')

const connectToDatabase = require('./db/connectDB')

connectToDatabase()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

server.listen({ port: 3003 })
  .then(res => console.log(`Server running at ${res.url}`))