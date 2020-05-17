const postsResolver = require("./posts");
const forumResolver = require("./forum");
const informationResolver = require("./information");

const rootResolver = {
  Query: {
    ...informationResolver.Query,
    ...forumResolver.Query,
  },
  Mutation: {
    ...informationResolver.Mutation,
    ...forumResolver.Mutation,
  },
};

module.exports = rootResolver;
