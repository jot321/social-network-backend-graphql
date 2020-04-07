const ShortArticle = require("../models/shortArticles");
const Listicle = require("../models/listicles");
const ImageArticle = require("../models/imageArticles");
const Tip = require("../models/tips");
const Professional = require("../models/professionals");
const VideoPlaylist = require("../models/videoPlaylists");
const User = require("../models/User");

const InformationProperties = require("../models/informationProperties");

const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4,
  VIDEOPLAYLIST: 5,
};

const populateInformationMessages = async (informationPropertiesList) => {
  let messages = [];

  await Promise.all(
    informationPropertiesList.map(async (element) => {
      let message_;

      switch (element.type) {
        case InformationType.SHORT_ARTICLE:
          message_ = await ShortArticle.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        case InformationType.LISTICLE:
          message_ = await Listicle.findOne({ CMS_ID: element.CMS_ID });
          break;

        case InformationType.IMAGE_ARTICLE:
          message_ = await ImageArticle.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        case InformationType.TIP:
          message_ = await Tip.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        case InformationType.VIDEOPLAYLIST:
          message_ = await VideoPlaylist.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        default:
          console.log("Information Type does not match");
          break;
      }

      messages.push({
        message: JSON.stringify(message_),
        properties: JSON.stringify(element),
      });
    })
  );
  return messages;
};

const populateMediaInformationMessages = async (
  informationPropertiesList,
  onlyNames = false
) => {
  let messages = [];

  await Promise.all(
    informationPropertiesList.map(async (element) => {
      let message_;

      switch (element.type) {
        case InformationType.VIDEOPLAYLIST:
          if (onlyNames) {
            message_ = await VideoPlaylist.findOne(
              {
                CMS_ID: element.CMS_ID,
              },
              { name: 1, byline: 1, CMS_ID: 1 }
            );
          } else {
            message_ = await VideoPlaylist.findOne({
              CMS_ID: element.CMS_ID,
            });
          }
          break;

        default:
          console.log("Information Type does not match");
          break;
      }

      messages.push({
        message: JSON.stringify(message_),
        properties: JSON.stringify(element),
      });
    })
  );
  return messages;
};
module.exports = {
  Query: {
    getHomeFeed: async (parent, args) => {
      try {
        let messages = [];
        let informationPropertiesList_;
        let count_ = 0;

        // INDIVIDUAL ARTICLE
        if (args.articleId) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            CMS_ID: args.articleId,
          });
        }
        // ACTUAL SEARCH
        else if (args.searchKey) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            visible_tags_names: args.searchKey,
          })
            .sort({
              importance: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          // TODO: Change the count document logic
          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        }
        // SEARCH BY TOP LEVEL CATEGORIES
        else if (args.toplevelcategory) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            top_level_category_name: args.toplevelcategory,
          })
            .sort({
              importance: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
            top_level_category_name: args.toplevelcategory,
          }).countDocuments();
        }
        // SEARCH BY CATEGORIES
        else if (args.category) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            sub_category_names: args.category,
          })
            .sort({
              importance: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        }
        // SEARCH BY TAGS
        else if (args.tag) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            visible_tags_names: args.tag,
          })
            .sort({
              importance: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        }
        // FEATURED CATEGORY - DAILY_PICK
        else if (args.dailyPicks) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            daily_pick: true,
          })
            .sort({
              importance: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
            daily_pick: true,
          }).countDocuments();
        }
        // POPULAR CATEGORY - SORT BY LIKES
        else if (args.sortByLikes) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            popular: true,
          })
            .sort({
              likes: -1,
            })
            .skip(args.offset)
            .limit(args.fetchLimit);
          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        } else {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);
          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        }

        messages = await populateInformationMessages(
          informationPropertiesList_
        );

        // TODO - Improve the sorting logic as JSON.parse will be called many times
        if (args.sortByLikes) {
          messages = messages.sort((x, y) => {
            return (
              JSON.parse(y.properties).likes - JSON.parse(x.properties).likes
            );
          });
        } else {
          messages = messages.sort((x, y) => {
            return (
              JSON.parse(y.properties).importance -
              JSON.parse(x.properties).importance
            );
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
    },
    getRandomSampledArticleIds: async (parent, args) => {
      informationPropertiesIds_ = await InformationProperties.aggregate([
        { $match: { hide: false, type: InformationType.LISTICLE } },
        { $sample: { size: 10000 } },
        { $project: { CMS_ID: 1 } },
      ]);

      informationPropertiesIds_ = informationPropertiesIds_.map(
        (x) => x.CMS_ID
      );
      return informationPropertiesIds_;
    },
    getArticleInformationFromArrayofIds: async (parent, args) => {
      informationPropertiesList_ = await InformationProperties.find({
        CMS_ID: { $in: args.inputIds },
      });
      messages = await populateInformationMessages(informationPropertiesList_);

      if (args.articleId) {
        informationPropertiesListArticle_ = await InformationProperties.find({
          hide: false,
          CMS_ID: args.articleId,
        });
        articleMessage = await populateInformationMessages(
          informationPropertiesListArticle_
        );
        return [...articleMessage, ...messages];
      }

      return messages;
    },
    getTips: async (parent, args) => {
      try {
        let messages = [];
        let informationPropertiesList_;
        let count_ = 0;

        // SEARCH BY CATEGORIES
        if (args.category) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            sub_category_names: args.category,
            type: InformationType.TIP,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
            sub_category_names: args.category,
            type: InformationType.TIP,
          }).countDocuments();
        }
        // SEARCH BY TAGS
        else if (args.tag) {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            visible_tags_names: args.tag,
            type: InformationType.TIP,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
          }).countDocuments();
        } else {
          informationPropertiesList_ = await InformationProperties.find({
            hide: false,
            type: InformationType.TIP,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            hide: false,
            type: InformationType.TIP,
          }).countDocuments();
        }

        messages = await populateInformationMessages(
          informationPropertiesList_
        );

        // TODO - Improve the sorting logic as JSON.parse will be called many times
        if (args.sortByLikes) {
          messages = messages.sort((x, y) => {
            return (
              JSON.parse(y.properties).likes - JSON.parse(x.properties).likes
            );
          });
        } else {
          messages = messages.sort((x, y) => {
            return (
              JSON.parse(y.properties).importance -
              JSON.parse(x.properties).importance
            );
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
    },
    getProfessionals: async (parent, args) => {
      try {
        let professionalsList_;
        let count_ = 0;

        if (args.pid) {
          professionalsList_ = await Professional.find({
            CMS_ID: args.pid,
          });
          count_ = 1;
        } else {
          professionalsList_ = await Professional.find()
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await Professional.find().countDocuments();
        }

        let hasMore = true;
        if (args.offset + args.fetchLimit > count_) {
          hasMore = false;
        }

        return {
          messages: JSON.stringify(professionalsList_),
          hasMore: hasMore,
        };
      } catch (err) {
        throw err;
      }
    },
    getVideoPlaylistNames: async (parent, args) => {
      try {
        let messages = [];
        let informationPropertiesList_;
        let count_ = 0;

        informationPropertiesList_ = await InformationProperties.find({
          type: InformationType.VIDEOPLAYLIST,
        })
          .skip(args.offset)
          .limit(args.fetchLimit);

        count_ = await InformationProperties.find({
          type: InformationType.VIDEOPLAYLIST,
        }).countDocuments();

        messages = await populateMediaInformationMessages(
          informationPropertiesList_,
          true
        );

        let hasMore = true;

        if (args.offset + args.fetchLimit > count_) {
          hasMore = false;
        }

        return { messages: messages, hasMore: hasMore };
      } catch (err) {
        throw err;
      }
    },
    getVideosFromPlaylist: async (parent, args) => {
      try {
        videosList_ = await VideoPlaylist.findOne({ CMS_ID: args.vpid });

        return JSON.stringify(videosList_);
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addOrUpdateUser: async (parent, args) => {
      try {
        User.findOne({ id: args.userInput.user_id })
          .exec()
          .then((docs) => {
            if (docs) {
              console.log("User already exists");
              return true;
            } else {
              const user = new User({
                id: args.userInput.user_id,
                name: args.userInput.name,
                email: args.userInput.email,
                image_url: args.userInput.image_url,
              });

              user
                .save()
                .then(() => {
                  console.log("New user added");
                  return true;
                })
                .catch((err) => {
                  console.log(err);
                  return false;
                });
            }
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      } catch {
        (err) => {
          console.log(err);
          return false;
        };
      }
    },
    incrementLikes: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

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
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

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
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

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
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

        properties.shares = properties.shares - 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
  },
};
