import { Arg, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";

import ChangePasswordService from "../change-password/ChangePasswordService";
import ChangePasswordInput from "../change-password/ChangePasswordInput";

@Service()
@Resolver()
export default class ChangePasswordResolver {
  @Inject(() => ChangePasswordService)
  private readonly changePasswordService: ChangePasswordService;

  @Mutation(() => Boolean)
  async changePassword(@Arg("input") { token, password }: ChangePasswordInput) {
    return await this.changePasswordService.changePassword(token, password);
  }
}
