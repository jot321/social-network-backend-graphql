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

  type ProfessionalOutboundMessage {
    messages: String
    hasMore: Boolean
  }

  input UserInput {
    user_id: ID!
    name: String!
    email: String!
    image_url: String!
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

    getRandomSampledArticleIds: [String!]!

    getArticleInformationFromArrayofIds(
      inputIds: [String] = []
      articleId: String = null
    ): [InformationMessage!]!

    getTips(
      fetchLimit: Int = 5
      offset: Int = 0
      category: String = null
      tag: String = null
    ): OutboundMessage!

    getVideoPlaylistNames(
      fetchLimit: Int = 6
      offset: Int = 0
    ): OutboundMessage!

    getVideosFromPlaylist(
      fetchLimit: Int = 5
      offset: Int = 0
      vpid: String = 0
    ): String!

    getProfessionals(
      pid: String = null
      fetchLimit: Int = 5
      offset: Int = 0
    ): ProfessionalOutboundMessage!

    getBookmarkedPostsForAUser(userId: ID!): [InformationMessage!]
    checkIfPostBookmarkedByUser(userId: ID!, CMS_ID: String!): Boolean
  }

  type Mutation {
    createPost(postInput: PostInput): Post

    addOrUpdateUser(userInput: UserInput): Boolean
    bookmarkPost(userId: String, CMS_ID: String): Boolean
    unBookmarkPost(userId: String, CMS_ID: String): Boolean

    incrementLikes(id: ID!): Boolean
    incrementShares(id: ID!): Boolean
    decrementLikes(id: ID!): Boolean
    decrementShares(id: ID!): Boolean
    incrementBookmarks(id: ID!): Boolean
    decrementBookmarks(id: ID!): Boolean
  }
`;
