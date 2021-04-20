import { Service } from "typedi";
import * as jwt from "jsonwebtoken";

@Service()
export default class JwtService {
  signToken(payload: any) {
    return jwt.sign(payload, "secretkey");
  }

  verifyToken(token: string) {
    return token ? jwt.verify(token, "secretkey") : undefined;
  }
}
