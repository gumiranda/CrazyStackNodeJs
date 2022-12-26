import jwt from "jsonwebtoken";
import {
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases/loadUser";
import { AccessDeniedError } from "@/application/errors";
import { env } from "@/application/infra/config";
import { ObjectId } from "mongodb";

export class RefreshTokenMiddleware implements Middleware {
  constructor(private readonly loadUser: LoadUser, private readonly roles: string[]) {}
  private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const authHeader = httpRequest?.headers?.["refreshtoken"];
      if (authHeader) {
        const decoded = await this.verifyToken(authHeader, env.jwtRefreshSecret);
        if (!decoded) {
          return unauthorized();
        }
        const { _id } = decoded;
        const query = {
          fields: {
            _id: new ObjectId(_id),
            role: { $in: this.roles },
          },
          options: { projection: { password: 0 } },
        };
        const user = await this.loadUser(query);
        if (user) {
          return ok({ userId: user?._id, userLogged: user });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
