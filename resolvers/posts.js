const Post = require("../models/posts");

module.exports = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createPost: async (args, req) => {
      const post = new Post({
        title: args.postInput.title,
        byline: args.postInput.byline,
        description: args.postInput.description,
        likes: 0,
        shares: 0
      });
      try {
        const result = await post.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    incrementLikes: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const post = await Post.findOne({ _id: args.postId });

        post.likes = post.likes + 1;
        const result = await post.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    incrementShares: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const post = await Post.findOne({ _id: args.postId });

        post.shares = post.shares + 1;
        const result = await post.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
