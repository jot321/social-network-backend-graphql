const ShortArticle = require("../models/shortArticles");

module.exports = {
  Query: {
    getShortArticles: async (parent, args) => {
      try {

        let shortArticle;
        if (args.sortByLikes) {
          shortArticles = await ShortArticle.find().sort({ likes: -1 });
        } else {
          shortArticles = await ShortArticle.find();
        }

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
        const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });

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
        const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });

        shortArticle.shares = shortArticle.shares + 1;
        const result = await shortArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    decrementLikesForShortArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });

        shortArticle.likes = shortArticle.likes - 1;
        const result = await shortArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    decrementSharesForShortArticles: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });

        shortArticle.shares = shortArticle.shares - 1;
        const result = await shortArticle.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
