const Post = require("../../models/posts");

module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (err) {
      throw err;
    }
  },
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
  incrementLikes: async args => {
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
  incrementShares: async args => {
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
};
