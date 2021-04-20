import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import User from "../entities/User";
import LoginInput from "./LoginInput";

@Service()
export default class LoginService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async login({ credentials, password }: LoginInput) {
    const user = credentials.includes("@")
      ? await this.userRepository.findOne({ email: credentials })
      : await this.userRepository.findOne({ username: credentials });

    if (!user) throw new Error("Invalid credentials");

    if (!(await bcrypt.compare(password, user.hash))) throw new Error("Invalid credentials");

    return user;
  }
}
