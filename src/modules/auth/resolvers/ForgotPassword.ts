import { Arg, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";

import ForgotPasswordService from "../forgot-password/ForgotPasswordService";
import MailService from "../MailService";

@Service()
@Resolver()
export default class ForgotPasswordResolver {
  @Inject(() => ForgotPasswordService)
  private readonly forgotPasswordService: ForgotPasswordService;

  @Inject(() => MailService)
  private readonly mailService: MailService;

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string) {
    const token = await this.forgotPasswordService.getToken(email);
    await this.mailService.send(email, `http://localhost:3000/auth/reset-password/${token}`);
    return true;
  }
}
