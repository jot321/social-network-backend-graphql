const ShortArticle = require("../models/shortArticles");

module.exports = {
  Query: {
    getShortArticles: async () => {
      try {
        const shortArticles = await ShortArticle.find();
        return shortArticles;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    incrementLikesForShortArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const shortArticle = await ShortArticle.findOne({ _id: args.id });

        shortArticle.likes = shortArticle.likes + 1;
        const result = await shortArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    incrementSharesForShortArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const shortArticle = await ShortArticle.findOne({ _id: args.id });

        shortArticle.shares = shortArticle.shares + 1;
        const result = await shortArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
