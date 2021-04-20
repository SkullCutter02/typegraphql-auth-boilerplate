import { Column, DeleteDateColumn, Entity } from "typeorm";

import ModelEntity from "../../../shared/ModelEntity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("users")
export default class User extends ModelEntity {
  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
