import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import Email from "../entities/Email";
import User from "../entities/User";

@Service()
export default class ChangePasswordService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Email)
  private readonly emailRepository: Repository<Email>;

  async changePassword(token: string, password: string) {
    const email = await this.emailRepository.findOneOrFail({ token });

    if (new Date(Date.now()) > email.expirationDate) {
      await email.remove();
      throw new Error("Confirmation link has expired");
    }

    const user = await this.userRepository.findOneOrFail({ id: email.userId });
    user.hash = await bcrypt.hash(password, 12);
    await user.save();
    await email.remove();

    return true;
  }
}
