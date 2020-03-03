const postsResolver = require('./posts');

const rootResolver = {
  ...postsResolver
};

module.exports = rootResolver;
