const postsResolvers = require('./posts'),
      usersResolvers = require('./users')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
}