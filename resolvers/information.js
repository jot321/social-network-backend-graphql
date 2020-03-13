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
        let informationPropertiesList_;
        let count_;

        if (args.dailyPicks) {
          informationPropertiesList_ = await InformationProperties.find({ hide: false, daily_pick: true })
            .sort({
              importance: -1
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({ hide: false, daily_pick: true }).countDocuments();
        } else if (args.sortByLikes) {
          informationPropertiesList_ = await InformationProperties.find({ hide: false })
            .sort({
              likes: -1
            })
            .skip(args.offset)
            .limit(args.fetchLimit);
          count_ = await InformationProperties.find({ hide: false }).countDocuments();
        } else {
          informationPropertiesList_ = await InformationProperties.find({ hide: false })
            .sort({
              importance: -1
            })
            .skip(args.offset)
            .limit(args.fetchLimit);
          count_ = await InformationProperties.find({ hide: false }).countDocuments();
        }

        await Promise.all(
          informationPropertiesList_.map(async element => {
            let message_;

            switch (element.type) {
              case InformationType.SHORT_ARTICLE:
                message_ = await ShortArticle.findOne({
                  CMS_ID: element.CMS_ID
                });
                break;

              case InformationType.LISTICLE:
                message_ = await Listicle.findOne({ CMS_ID: element.CMS_ID });
                break;

              case InformationType.IMAGE_ARTICLE:
                message_ = await ImageArticle.findOne({
                  CMS_ID: element.CMS_ID
                });
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

        // TODO - Improve the sorting logic as JSON.parse will be called many times
        if (args.sortByLikes) {
          messages = messages.sort((x, y) => {
            return JSON.parse(y.properties).likes - JSON.parse(x.properties).likes;
          });
        } else {
          messages = messages.sort((x, y) => {
            return JSON.parse(y.properties).importance - JSON.parse(x.properties).importance;
          });
        }

        let hasMore = true;

        if (args.offset + args.fetchLimit > count_) {
          hasMore = false;
        }

        return { messages: messages, hasMore: hasMore };
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    incrementLikes: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const properties = await InformationProperties.findOne({ CMS_ID: args.id });

        properties.likes = properties.likes + 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
    incrementShares: async (parent, args) => {
      try {
        const properties = await InformationProperties.findOne({ CMS_ID: args.id });

        properties.shares = properties.shares + 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
    decrementLikes: async (parent, args) => {
      try {
        const properties = await InformationProperties.findOne({ CMS_ID: args.id });

        properties.likes = properties.likes - 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
    decrementShares: async (parent, args) => {
      try {
        const properties = await InformationProperties.findOne({ CMS_ID: args.id });

        properties.shares = properties.shares - 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    }
  }
};
