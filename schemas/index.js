// const { buildSchema } = require("graphql");
const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    byline: String!
    description: String!
    likes: Int!
    shares: Int!
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
    likes: Int!
    shares: Int!
    importance: Int!
  }

  type ImageArticle {
    _id: ID!
    CMS_ID: String!
    image: String!
    top_level_category_name: String!
    visible_tags_names: [String!]
    not_visible_tags_names: [String!]
    sub_category_names: [String!]!
    likes: Int!
    shares: Int!
    importance: Int!
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
    likes: Int!
    shares: Int!
    importance: Int!
  }

  type InformationProperties {
    id: ID!
    CMS_ID: String!
    type: Int!
    likes: Int!
    shares: Int!
    importance: Int!
    daily_pick: Int!
    hide: Int!
  }

  type InformationMessage {
    message: String!
    properties: String!
  }

  type OutboundMessage {
    messages: [InformationMessage!]!
    hasMore: Boolean
  }

  type Query {
    posts: [Post!]!
    getHomeFeed(
      sortByLikes: Boolean = false
      dailyPicks: Boolean = false
      fetchLimit: Int = 5
      offset: Int = 0
      toplevelcategory: String = null
      category: String = null
      tag: String = null
      searchKey: String = null
      articleId: String = null
    ): OutboundMessage!
  }

  type Mutation {
    createPost(postInput: PostInput): Post

    incrementLikes(id: ID!): Boolean
    incrementShares(id: ID!): Boolean
    decrementLikes(id: ID!): Boolean
    decrementShares(id: ID!): Boolean
  }
`;
