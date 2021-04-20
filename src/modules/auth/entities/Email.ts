import { Column, Entity } from "typeorm";

import ModelEntity from "../../../shared/ModelEntity";

@Entity("emails")
export default class Email extends ModelEntity {
  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  expirationDate: Date;
}
