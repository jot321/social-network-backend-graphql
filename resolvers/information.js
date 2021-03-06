const ShortArticle = require("../models/shortArticles");
const Listicle = require("../models/listicles");
const ImageArticle = require("../models/imageArticles");
const ExternalLink = require("../models/externalLink");
const Tip = require("../models/tips");
const Question = require("../models/question");
const Professional = require("../models/professionals");
const VideoPlaylist = require("../models/videoPlaylists").videoPlaylistsSchema;
const VideoLink = require("../models/videoPlaylists").videoLinkSchema;
const User = require("../models/user");

const sentenceToSlug = require("../helpers").sentenceToSlug;

const InformationProperties = require("../models/informationProperties");

const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4,
  VIDEOPLAYLIST: 5,
  VIDEOLINK: 6,
  EXTERNAL_LINK: 7,
  QUESTION: 8,
};

const populateInformationMessages = async (informationPropertiesList) => {
  let messages = [];

  await Promise.all(
    informationPropertiesList.map(async (element) => {
      let message_;

      // Populate the relevant content piece to the message
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

        case InformationType.EXTERNAL_LINK:
          message_ = await ExternalLink.findOne({
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

        case InformationType.VIDEOLINK:
          message_ = await VideoLink.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        case InformationType.QUESTION:
          message_ = await Question.findOne({
            CMS_ID: element.CMS_ID,
          });
          break;

        default:
          console.log("Information Type does not match");
          break;
      }

      if (message_) {
        messages.push({
          message: JSON.stringify(message_),
          properties: JSON.stringify(element),
        });
      }
    }, Promise.resolve())
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
              { name: 1, CMS_ID: 1, image: 1 }
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

      if (message_) {
        messages.push({
          message: JSON.stringify(message_),
          properties: JSON.stringify(element),
        });
      }
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

        // SEARCH BY GROUPS
        else if (args.group) {
          if (args.contentType) {
            informationPropertiesList_ = await InformationProperties.find({
              hide: false,
              groups: args.group,
              type: args.contentType,
            })
              .skip(args.offset)
              .limit(args.fetchLimit);

            count_ = await InformationProperties.find({
              hide: false,
              groups: args.group,
              type: args.contentType,
            }).countDocuments();
          } else {
            informationPropertiesList_ = await InformationProperties.find({
              hide: false,
              groups: args.group,
            })
              .skip(args.offset)
              .limit(args.fetchLimit);

            count_ = await InformationProperties.find({
              hide: false,
              groups: args.group,
            }).countDocuments();
          }
        }

        // SEARCH BY TOP LEVEL CATEGORIES
        else if (args.toplevelcategory) {
          if (args.contentType) {
            informationPropertiesList_ = await InformationProperties.find({
              hide: false,
              top_level_category_name: args.toplevelcategory,
              type: args.contentType,
            })
              .sort({
                importance: -1,
              })
              .skip(args.offset)
              .limit(args.fetchLimit);

            count_ = await InformationProperties.find({
              hide: false,
              top_level_category_name: args.toplevelcategory,
              type: args.contentType,
            }).countDocuments();
          } else {
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
        }

        // SEARCH BY CATEGORIES
        // else if (args.category) {
        //   informationPropertiesList_ = await InformationProperties.find({
        //     hide: false,
        //     sub_category_names: args.category,
        //   })
        //     .sort({
        //       importance: -1,
        //     })
        //     .skip(args.offset)
        //     .limit(args.fetchLimit);

        //   count_ = await InformationProperties.find({
        //     hide: false,
        //     sub_category_names: args.category,
        //   }).countDocuments();
        // }

        // // SEARCH BY TAGS
        // else if (args.tag) {
        //   informationPropertiesList_ = await InformationProperties.find({
        //     hide: false,
        //     visible_tags_names: args.tag,
        //   })
        //     .sort({
        //       importance: -1,
        //     })
        //     .skip(args.offset)
        //     .limit(args.fetchLimit);

        //   count_ = await InformationProperties.find({
        //     hide: false,
        //   }).countDocuments();
        // }

        // // FEATURED CATEGORY - DAILY_PICK
        // else if (args.dailyPicks) {
        //   informationPropertiesList_ = await InformationProperties.find({
        //     hide: false,
        //     daily_pick: true,
        //   })
        //     .sort({
        //       importance: -1,
        //     })
        //     .skip(args.offset)
        //     .limit(args.fetchLimit);

        //   count_ = await InformationProperties.find({
        //     hide: false,
        //     daily_pick: true,
        //   }).countDocuments();
        // }

        // POPULAR CATEGORY - SORT BY LIKES
        else if (args.sortByLikes) {
          if (args.contentType) {
            informationPropertiesList_ = await InformationProperties.find({
              hide: false,
              popular: true,
              type: args.contentType,
            })
              .sort({
                likes: -1,
              })
              .skip(args.offset)
              .limit(args.fetchLimit);

            count_ = await InformationProperties.find({
              hide: false,
              popular: true,
              type: args.contentType,
            }).countDocuments();
          } else {
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
              popular: true,
            }).countDocuments();
          }
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
        {
          $match: {
            hide: false,
            type: {
              $in: [
                InformationType.SHORT_ARTICLE,
                InformationType.LISTICLE,
                InformationType.TIP,
                InformationType.EXTERNAL_LINK,
                InformationType.VIDEOLINK,
                InformationType.IMAGE_ARTICLE,
              ],
            },
          },
        },
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

        if (args.slug) {
          professionalsList_ = await Professional.find({
            slug: args.slug,
          });
          count_ = 1;
        } else if (args.toplevelcategory) {
          professionalsList_ = await Professional.find({
            top_level_category_name: args.toplevelcategory,
          })
            .sort({ importance: -1 })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await Professional.find({
            top_level_category_name: args.toplevelcategory,
          }).countDocuments();
        } else {
          professionalsList_ = await Professional.find()
            .sort({ importance: -1 })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await Professional.find().countDocuments();
        }

        let hasMore = true;
        if (args.offset + args.fetchLimit > count_) {
          hasMore = false;
        }

        professionalsList_ = professionalsList_.sort((x, y) => {
          return y.importance - x.importance;
        });

        return {
          messages: JSON.stringify(professionalsList_),
          hasMore: hasMore,
        };
      } catch (err) {
        throw err;
      }
    },
    getEvents: async (parent, args) => {
      try {
        let professionalsList_;

        professionalsList_ = await Professional.find({
          "events.live": "true",
        });

        // professionalsList_.map((professional) => {
        //   console.log(
        //     professional.events.filter((event) => {
        //       return event.live === "true" ? true : false;
        //     })
        //   );
        // });

        return JSON.stringify(professionalsList_);
      } catch (err) {
        throw err;
      }
    },
    getVideoPlaylistNames: async (parent, args) => {
      try {
        let messages = [];
        let informationPropertiesList_;
        let count_ = 0;

        // Search using top level category name
        if (args.toplevelcategory) {
          informationPropertiesList_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
            top_level_category_name: args.toplevelcategory,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
            top_level_category_name: args.toplevelcategory,
          }).countDocuments();
        }

        // Search using the top level category slug. Was added later so didn't remove the above
        else if (args.topLevelCategorySlug) {
          informationPropertiesList_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
            top_level_category_slug: args.topLevelCategorySlug,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
            top_level_category_slug: args.topLevelCategorySlug,
          }).countDocuments();
        }

        // Return default
        else {
          informationPropertiesList_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
          })
            .skip(args.offset)
            .limit(args.fetchLimit);

          count_ = await InformationProperties.find({
            type: InformationType.VIDEOPLAYLIST,
          }).countDocuments();
        }

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
        let videosInformation_ = {};

        videoList_ = await VideoPlaylist.findOne({ CMS_ID: args.vpid });

        videosInformation_.CMS_ID = videoList_.CMS_ID;
        videosInformation_.name = videoList_.name;
        videosInformation_.byline = videoList_.byline;
        videosInformation_.image = videoList_.image;
        videosInformation_.videoLinks = [];

        videosInformation_.properties = await InformationProperties.findOne({
          CMS_ID: args.vpid,
        });

        await Promise.all(
          videoList_.videoLinksB.map(async (video) => {
            const individualVideoInformation_ = {};
            individualVideoInformation_.CMS_ID = video.CMS_ID;
            individualVideoInformation_.videoLink = video.videoLink;
            individualVideoInformation_.title = video.title;

            individualVideoInformation_.properties = await InformationProperties.findOne(
              {
                CMS_ID: video.CMS_ID,
              }
            );
            videosInformation_.videoLinks.push(individualVideoInformation_);
          })
        );

        return JSON.stringify(videosInformation_);
      } catch (err) {
        throw err;
      }
    },
    getBookmarkedPostsForAUser: async (parent, args) => {
      try {
        const user = await User.findOne({ id: args.userId });

        if (user) {
          informationPropertiesList_ = await InformationProperties.find({
            CMS_ID: { $in: user.bookmarkedPosts },
          });
          messages = await populateInformationMessages(
            informationPropertiesList_
          );
          return messages;
        } else {
          console.log("ERROR: Not able to find user.");
          return [];
        }
      } catch {
        (err) => {
          console.log(err);
          return false;
        };
      }
    },
    checkIfPostBookmarkedByUser: async (parent, args) => {
      try {
        const user = await User.findOne({ id: args.userId });

        if (user) {
          if (user.bookmarkedPosts.indexOf(args.CMS_ID) > -1) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch {
        (err) => {
          console.log(err);
          return false;
        };
      }
    },
  },
  Mutation: {
    addOrUpdateUser: async (parent, args) => {
      try {
        const result = await User.findOne({ id: args.userInput.user_id })
          .exec()
          .then(async (docs) => {
            if (docs) {
              console.log("User already exists");

              return {
                systemId: docs._id,
                expert: docs.expert == true ? true : false,
              };
            } else {
              const user = new User({
                id: args.userInput.user_id,
                name: args.userInput.name,
                email: args.userInput.email,
                image_url: args.userInput.image_url,
              });

              const newUserResult = await user
                .save()
                .then((docs) => {
                  console.log("New user added");

                  return {
                    systemId: docs._id,
                    expert: docs.expert == true ? true : false,
                  };
                })
                .catch((err) => {
                  console.log(err);
                  return false;
                });
              return newUserResult;
            }
          })
          .catch((err) => {
            console.log(err);
            return false;
          });

        return result;
      } catch {
        (err) => {
          console.log(err);
          return false;
        };
      }
    },
    bookmarkPost: async (parent, args) => {
      try {
        const user = await User.findOne({ id: args.userId });

        if (user) {
          user.bookmarkedPosts.push(args.CMS_ID);
          user.bookmarkedPosts = [...new Set(user.bookmarkedPosts)];

          const result = user
            .save()
            .then(() => true)
            .catch(() => false);

          return true;
        } else {
          console.log("ERROR: Not able to find user.");
          return false;
        }
      } catch {
        (err) => {
          console.log(err);
          return false;
        };
      }
    },
    unBookmarkPost: async (parent, args) => {
      try {
        const user = await User.findOne({ id: args.userId });

        if (user) {
          const index = await user.bookmarkedPosts.indexOf(args.CMS_ID);
          if (index > -1) {
            user.bookmarkedPosts.splice(index, 1);

            const result = user
              .save()
              .then(() => true)
              .catch(() => false);
          }

          return true;
        } else {
          console.log("ERROR: Not able to find user.");
          return false;
        }
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
        properties
          .save()
          .then(() => true)
          .catch((err) => {
            console.log(err);
          });
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
    incrementBookmarks: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

        properties.bookmarks = properties.bookmarks + 1;
        properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
    decrementBookmarks: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const properties = await InformationProperties.findOne({
          CMS_ID: args.id,
        });

        properties.bookmarks = properties.bookmarks - 1;
        const result = properties
          .save()
          .then(() => true)
          .catch(() => false);
      } catch (err) {
        throw err;
      }
    },
    addExpertComment: async (parent, args) => {
      try {
        // TODO : Use the update method to do the following operation
        const properties = await InformationProperties.findOne({
          CMS_ID: args.CMS_ID,
        });

        if (args.userId === "GUEST") {
          properties.expertComments.push({
            content: args.content,
            writtenByGuest: true,
            userName: "Guest",
          });
          properties.discussionsCount = properties.discussionsCount + 1;
        } else if (args.writtenByExpert == true) {
          const user = await User.findOne({ _id: args.userId });
          properties.expertComments.push({
            content: args.content,
            userId: args.userId,
            userName: user.name,
            writtenByExpert: true,
            slug: user.slug,
          });
          properties.expertCommentsCount = properties.expertCommentsCount + 1;
        } else {
          const user = await User.findOne({ _id: args.userId });
          properties.expertComments.push({
            content: args.content,
            userId: args.userId,
            userName: user.name,
          });
          properties.discussionsCount = properties.discussionsCount + 1;
        }

        await properties
          .save()
          .then()
          .catch((err) => {
            console.log(err);
          });

        properties.topComments = properties.expertComments
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 2);

        properties
          .save()
          .then()
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        throw err;
      }
    },
    incrementExpertCommentLikes: async (parent, args) => {
      try {
        await InformationProperties.updateOne(
          {
            CMS_ID: args.CMS_ID,
            expertComments: { $elemMatch: { _id: args.CommentId } },
          },
          { $inc: { "expertComments.$.likes": 1 } }
        );

        const properties = await InformationProperties.findOne({
          CMS_ID: args.CMS_ID,
        });

        properties.topComments = properties.expertComments
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 2);

        properties
          .save()
          .then()
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        throw err;
      }
    },
    addQuestion: async (parent, args) => {
      try {
        const question = new Question({
          title: args.title,
          text: args.text,
        });

        await question
          .save()
          .then((question) => {
            // Copying _id to CMS_ID, because whole Strapi supported backend uses CMS_ID
            question.CMS_ID = question._id;
            question
              .save()
              .then(() => {
                const informationProperties = new InformationProperties({
                  CMS_ID: question._id,
                  type: InformationType.QUESTION,
                  top_level_category_name: args.topLevelCategory
                    .toLowerCase()
                    .trim(),
                  top_level_category_slug: sentenceToSlug(
                    args.topLevelCategory.toLowerCase().trim()
                  ),
                  groups: [args.group],
                });

                informationProperties
                  .save()
                  .then()
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        throw err;
      }
    },
  },
};
