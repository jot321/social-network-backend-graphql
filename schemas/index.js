// const { buildSchema } = require("graphql");
const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    byline: String!
    description: String!
    likes: Float!
    shares: Float!
  }

  input PostInput {
    title: String!
    byline: String!
    description: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(postInput: PostInput): Post
    incrementLikes(postId: ID!): Post
    incrementShares(postId: ID!): Post
  }
`;
