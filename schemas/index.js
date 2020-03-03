const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post{
  _id: ID!
  title: String!
  byline: String!
  description: String!
  likes: Float!
  shares: Float!
}

input PostInput{
  title: String!
  byline: String!
  description: String!
}

type RootQuery {
    posts: [Post!]!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    incrementLikes(postId: ID!): Post
    incrementShares(postId: ID!): Post
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
