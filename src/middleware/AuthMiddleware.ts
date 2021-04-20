import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Inject, Service } from "typedi";

import Context from "../types/Context";
import JwtService from "../modules/auth/JwtService";

@Service()
export default class AuthMiddleware implements MiddlewareInterface<Context> {
  @Inject(() => JwtService)
  private readonly jwtService: JwtService;

  async use({ context: { req, res }, info }: ResolverData<Context>, next: NextFn) {
    const userId = this.jwtService.verifyToken(req.cookies.token);

    if (userId) {
      res.locals.userId = userId as string;
      return next();
    } else {
      throw new Error("Not authorized");
    }
  }
}
