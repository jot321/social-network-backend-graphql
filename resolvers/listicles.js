const Listicle = require("../models/listicles");

module.exports = {
  Query: {
    getListicles: async (parent, args) => {
      try {
        let listicles;
        // if (args.sortByLikes) {
        //   shortArticles = await ShortArticle.find().sort({ likes: -1 });
        // } else {
        //   shortArticles = await ShortArticle.find();
        // }

        listicles = await Listicle.find();
        return listicles;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    //     incrementLikesForShortArticles: async (parent, args) => {
    //       try {
    //         // TODO : Use the update method to do the following operation
    //         const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });
    //         shortArticle.likes = shortArticle.likes + 1;
    //         const result = await shortArticle.save();
    //         return result;
    //       } catch (err) {
    //         throw err;
    //       }
    //     },
    //     incrementSharesForShortArticles: async (parent, args) => {
    //       try {
    //         // TODO : Use the update method to do the following operation
    //         const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });
    //         shortArticle.shares = shortArticle.shares + 1;
    //         const result = await shortArticle.save();
    //         return result;
    //       } catch (err) {
    //         throw err;
    //       }
    //     },
    //     decrementLikesForShortArticles: async (parent, args) => {
    //       try {
    //         // TODO : Use the update method to do the following operation
    //         const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });
    //         shortArticle.likes = shortArticle.likes - 1;
    //         const result = await shortArticle.save();
    //         return result;
    //       } catch (err) {
    //         throw err;
    //       }
    //     },
    //     decrementSharesForShortArticles: async (parent, args) => {
    //       try {
    //         // TODO : Use the update method to do the following operation
    //         const shortArticle = await ShortArticle.findOne({ CMS_ID: args.id });
    //         shortArticle.shares = shortArticle.shares - 1;
    //         const result = await shortArticle.save();
    //         return result;
    //       } catch (err) {
    //         throw err;
    //       }
    //     }
  }
};
