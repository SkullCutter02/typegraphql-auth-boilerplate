import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";

import DeleteAccountService from "../delete-account/DeleteAccountService";
import Context from "../../../types/Context";
import AuthMiddleware from "../../../middleware/AuthMiddleware";

@Service()
@Resolver()
export default class DeleteAccountResolver {
  @Inject()
  private readonly deleteAccountService: DeleteAccountService;

  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() { res }: Context) {
    const success = await this.deleteAccountService.deleteAccount(res.locals.userId);
    res.clearCookie("token");
    return success;
  }
}
