const postsResolver = require('./posts');
const shortArticlesResolver = require('./shortArticles');

const rootResolver = {
  ...postsResolver,
  ...shortArticlesResolver
};

module.exports = rootResolver;
