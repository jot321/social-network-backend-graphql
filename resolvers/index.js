const postsResolver = require("./posts");
const informationResolver = require("./information");

const rootResolver = {
  Query: {
    ...informationResolver.Query
  },
  Mutation: {
    ...informationResolver.Mutation
  }
};

module.exports = rootResolver;
