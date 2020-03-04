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

  type ShortArticle{
    _id: ID!
    title: String!
    byline: String!
    description: String!
    attachedImage: String!
    category_name: String!
    tags_name: [String]
    likes: Float!
    shares: Float!
  }

  type Query {
    posts: [Post!]!
    getShortArticles: [ShortArticle!]!
  }

  type Mutation {
    createPost(postInput: PostInput): Post
    incrementLikes(postId: ID!): Post
    incrementShares(postId: ID!): Post

    incrementLikesForShortArticles(id: ID!): ShortArticle
    incrementSharesForShortArticles(id: ID!): ShortArticle
  }
`;
