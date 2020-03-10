const ImageArticle = require("../models/imageArticles");

module.exports = {
  Query: {
    getImageArticles: async () => {
      try {
        const imageArticles = await ImageArticle.find();
        return imageArticles;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    incrementLikesForImageArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const imageArticle = await ImageArticle.findOne({ CMS_ID: args.id });
        console.log('This happened')

        imageArticle.likes = imageArticle.likes + 1;
        const result = await imageArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    incrementSharesForImageArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const imageArticle = await ImageArticle.findOne({ CMS_ID: args.id });

        imageArticle.shares = imageArticle.shares + 1;
        const result = await imageArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    decrementLikesForImageArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const imageArticle = await ImageArticle.findOne({ CMS_ID: args.id });

        imageArticle.likes = imageArticle.likes - 1;
        const result = await imageArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    decrementSharesForImageArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const imageArticle = await ImageArticle.findOne({ CMS_ID: args.id });

        imageArticle.shares = imageArticle.shares - 1;
        const result = await imageArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
