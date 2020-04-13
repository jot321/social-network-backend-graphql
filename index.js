// While using AWS Lambda the following package can be used a Lambda function can directly be used
// const { ApolloServer } = require("apollo-server-lambda");
const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");
const config = require("./config.json");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

mongoose
  .connect(
    // `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER}/${config.MONGO_DB}?retryWrites=true`
    // "mongodb+srv://jot321:jot321@cluster0-yk5pq.mongodb.net/test?retryWrites=true&w=majority"
    "mongodb://root:example@127.0.0.1:27017"
  )
  .then(() => {
    console.log("MongoDb Connected!!!");
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

const server = new ApolloServer({ typeDefs, resolvers });

// -------------------------
// To deploy the server on AWS Lambda
// exports.graphqlHandler = server.createHandler({
//   cors: {
//     origin: true,
//     credentials: true,
//   },
// });

// -------------------------
// To run the server locally
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
