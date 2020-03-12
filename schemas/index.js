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

  type ShortArticle {
    _id: ID!
    CMS_ID: String!
    title: String!
    byline: String!
    description: String!
    attachedImage: String!
    top_level_category_name: String!
    visible_tags_names: [String!]
    not_visible_tags_names: [String!]
    sub_category_names: [String!]!
    likes: Float!
    shares: Float!
    importance: Float!
  }

  type ImageArticle {
    _id: ID!
    CMS_ID: String!
    image: String!
    top_level_category_name: String!
    visible_tags_names: [String!]
    not_visible_tags_names: [String!]
    sub_category_names: [String!]!
    likes: Float!
    shares: Float!
    importance: Float!
  }

  type ListicleItem {
    listicleItemHeader: String
    listicleItemDescription: String
  }

  type Listicle {
    _id: ID!
    CMS_ID: String!
    title: String!
    byline: String!
    description: String!
    attachedImage: String!
    listicleItems: [ListicleItem]
    top_level_category_name: String!
    visible_tags_names: [String!]
    not_visible_tags_names: [String!]
    sub_category_names: [String!]!
    likes: Float!
    shares: Float!
    importance: Float!
  }

  type InformationProperties {
    id: ID!
    CMS_ID: String!
    type: Float!
    likes: Float!
    shares: Float!
    importance: Float!
    daily_pick: Float!
    hide: Float!
  }

  type InformationMessage {
    message: String!
    properties: String!
  }

  type Query {
    posts: [Post!]!
    getHomeFeed(sortByLikes: Boolean = false, popular: Boolean = false): [InformationMessage!]!
  }

  type Mutation {
    createPost(postInput: PostInput): Post

    incrementLikes(id: ID!): Boolean
    incrementShares(id: ID!): Boolean
    decrementLikes(id: ID!): Boolean
    decrementShares(id: ID!): Boolean

  }
`;
