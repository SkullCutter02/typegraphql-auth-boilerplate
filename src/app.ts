import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Container } from "typeorm-typedi-extensions";
import cookieParser from "cookie-parser";

import createSchema from "./utils/createSchema";

const PORT = 4000;

const main = async () => {
  useContainer(Container);

  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(cookieParser());

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().then();
