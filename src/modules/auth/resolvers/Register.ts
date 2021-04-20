import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { Inject, Service } from "typedi";

import RegisterInput from "../register/RegisterInput";
import User from "../entities/User";
import RegisterService from "../register/RegisterService";
import Context from "../../../types/Context";
import JwtService from "../JwtService";
import cookieOptions from "../../../utils/cookieOptions";

@Service()
@Resolver(User)
export default class RegisterResolver {
  @Inject(() => RegisterService)
  private readonly registerService: RegisterService;

  @Inject(() => JwtService)
  private readonly jwtService: JwtService;

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput, @Ctx() { res }: Context): Promise<User> {
    const user = await this.registerService.register(input);
    res.cookie("token", this.jwtService.signToken(user.id), cookieOptions);
    return user;
  }
}
