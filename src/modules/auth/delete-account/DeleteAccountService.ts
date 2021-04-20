import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import User from "../entities/User";

@Service()
export default class DeleteAccountService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async deleteAccount(userId: string) {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    await user.softRemove();
    return true;
  }
}
