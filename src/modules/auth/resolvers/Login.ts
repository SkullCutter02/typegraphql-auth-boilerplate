import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { Inject, Service } from "typedi";

import User from "../entities/User";
import LoginInput from "../login/LoginInput";
import Context from "../../../types/Context";
import LoginService from "../login/LoginService";
import JwtService from "../JwtService";
import cookieOptions from "../../../utils/cookieOptions";

@Service()
@Resolver(User)
export default class LoginResolver {
  @Inject(() => LoginService)
  private readonly loginService: LoginService;

  @Inject(() => JwtService)
  private readonly jwtService: JwtService;

  @Mutation(() => User)
  async login(@Arg("input") input: LoginInput, @Ctx() { res }: Context) {
    const user = await this.loginService.login(input);
    res.cookie("token", this.jwtService.signToken(user.id), cookieOptions);
    return user;
  }
}
