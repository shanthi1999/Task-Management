import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import db from "./config/database";

const typeDefsArray = loadFilesSync(
  path.join(__dirname, "./**/**/*.typeDefs.ts")
);
const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/**/*.resolvers.ts")
);

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server)
  .then(({ url }) => {
    console.log(`🚀 server ready at ${url}`);
  })
  .catch((error) => {
    console.error("Failed to start server", error);
  });

db.on("open", () => {
  console.log("Database connected");
});
db.on("error", () => {
  console.log("error in connecting to database");
});
