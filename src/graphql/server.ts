import { ApolloServer } from "apollo-server-micro";
import { context } from "./context";
import { schema } from "./schema";

export const server = new ApolloServer({
  schema,
  context,
});
