import { buildSchema } from "type-graphql";
import { Container } from "typedi";

const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../modules/**/resolvers/*.ts"],
    container: Container,
  });
};

export default createSchema;
