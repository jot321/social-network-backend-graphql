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
  }

  type ListicleItem{
    listicleItemHeader: String!
    listicleItemDescription: String!
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
  }


  type Query {
    posts: [Post!]!
    getShortArticles(sortByLikes: Boolean = false): [ShortArticle!]!
    getImageArticles: [ImageArticle!]!
    getListicles: [Listicle!]!
  }

  type Mutation {
    createPost(postInput: PostInput): Post
    incrementLikes(postId: ID!): Post
    incrementShares(postId: ID!): Post

    incrementLikesForShortArticles(id: ID!): ShortArticle
    incrementSharesForShortArticles(id: ID!): ShortArticle
    decrementLikesForShortArticles(id: ID!): ShortArticle
    decrementSharesForShortArticles(id: ID!): ShortArticle


    incrementLikesForImageArticles(id: ID!): ImageArticle
    incrementSharesForImageArticles(id: ID!): ImageArticle
    decrementLikesForImageArticles(id: ID!): ImageArticle
    decrementSharesForImageArticles(id: ID!): ImageArticle
  }
`;
