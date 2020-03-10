const postsResolver = require("./posts");
const shortArticlesResolver = require("./shortArticles");
const imageArticlesResolver = require("./imageArticles");
const listiclesResolver = require("./listicles");

const rootResolver = {
  Query: {
    ...shortArticlesResolver.Query,
    ...imageArticlesResolver.Query,
    ...listiclesResolver.Query
  },
  Mutation: {
    ...shortArticlesResolver.Mutation,
    ...imageArticlesResolver.Mutation,
    ...listiclesResolver.Mutation
  }
};

module.exports = rootResolver;
