import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import User from "../entities/User";
import Context from "../../../types/Context";
import AuthMiddleware from "../../../middleware/AuthMiddleware";

@Service()
@Resolver(User)
export default class MeResolver {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @UseMiddleware(AuthMiddleware)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { res }: Context): Promise<User> {
    return this.userRepository.findOne({ id: res.locals.userId });
  }
}
