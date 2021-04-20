import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Email from "../entities/Email";
import addMillisecondsToNow from "../../../utils/addMillisecondsToNow";

@Service()
export default class ForgotPasswordService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Email)
  private readonly emailRepository: Repository<Email>;

  async getToken(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error("User not found");

    const token = uuid();

    await this.emailRepository
      .create({ userId: user.id, token, expirationDate: addMillisecondsToNow() })
      .save();

    return token;
  }
}
