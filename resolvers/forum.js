const Forum = require("../models/forum/forum");
const Discussion = require("../models/forum/discussion");

module.exports = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createForum: async (parent, args) => {
      const forum_name = args.forum_name;
      const forum_slug = args.forum_slug;

      Forum.findOne({ forum_slug }).exec((error, forum) => {
        if (error) {
          console.log(error);
          //   reject({ serverError: true });
          return false;
        } else if (forum) {
          //   reject({ alreadyExists: true });
          return false;
        } else {
          // forum does not exists, so create a new one
          const newForum = new Forum({
            forum_slug,
            forum_name,
          });

          newForum.save((error) => {
            if (error) {
              console.log(error);
              //   reject({ created: false });
              return false;
            } else {
              //   resolve(Object.assign({}, newForum, { created: true }));
              return true;
            }
          });
        }
      });
    },
    createDiscussion: async (parent, args) => {
      const newDiscussion = new Discussion({
        forum_id: discussion.forumId,
        forum: discussion.forumId,
        user_id: discussion.userId,
        user: discussion.userId,
        discussion_slug: generateDiscussionSlug(discussion.title),
        date: new Date(),
        title: discussion.title,
        content: discussion.content,
        favorites: [],
        tags: discussion.tags,
        pinned: discussion.pinned,
      });

      newDiscussion.save((error) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        resolve(newDiscussion);
      });
    },
  },
};
