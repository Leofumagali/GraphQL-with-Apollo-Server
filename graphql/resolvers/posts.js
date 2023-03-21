const Post = require('../../models/Post')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const postFound = await Post.findById(postId)

        if(!postFound) {
          throw new Error('Post not found')
        }

        return postFound
      } catch(err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost() {
      
    }
  }
};