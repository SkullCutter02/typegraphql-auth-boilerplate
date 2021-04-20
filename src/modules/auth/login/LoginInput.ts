import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export default class LoginInput {
  @Field()
  @Length(1, 255)
  credentials: string;

  @Field()
  @Length(1, 255)
  password: string;
}
