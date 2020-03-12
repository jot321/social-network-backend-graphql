const ShortArticle = require("../models/shortArticles");
const Listicle = require("../models/listicles");
const ImageArticle = require("../models/imageArticles");

const InformationProperties = require("../models/InformationProperties");

const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4
};

module.exports = {
  Query: {
    getHomeFeed: async (parent, args) => {
      try {
        let messages = [];
        let informationPropertiesList_ = await InformationProperties.find().sort({
          importance: -1
        });

        await Promise.all(
          informationPropertiesList_.map(async element => {
            let message_;
            let type_;

            switch (element.type) {
              case InformationType.SHORT_ARTICLE:
                message_ = await ShortArticle.findOne({
                  CMS_ID: element.CMS_ID
                });
                type_ = InformationType.SHORT_ARTICLE;
                break;

              case InformationType.LISTICLE:
                message_ = await Listicle.findOne({ CMS_ID: element.CMS_ID });
                type_ = InformationType.LISTICLE;
                break;

              case InformationType.IMAGE_ARTICLE:
                message_ = await ImageArticle.findOne({
                  CMS_ID: element.CMS_ID
                });
                type_ = InformationType.IMAGE_ARTICLE;
                break;

              default:
                console.log("Information Type does not match");
                break;
            }

            messages.push({
              message: JSON.stringify(message_),              
              properties: JSON.stringify(element)
            });
          })
        );

        return messages;
      } catch (err) {
        throw err;
      }
    },
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
