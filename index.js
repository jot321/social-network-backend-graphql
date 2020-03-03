// While using AWS Lambda the following package can be used a Lambda function can directly be used
// const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    console.log("MongoDb Connected!!!");
  })
  .catch(err => {
    console.log(err);
    throw(err);
  });

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// -------------------------
// To deploy the server on AWS Lambda
// exports.graphqlHandler = server.createHandler({
//     cors: {
//       origin: true,
//       credentials: true,
//     },
//   });

// -------------------------
// To run the server locally
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
