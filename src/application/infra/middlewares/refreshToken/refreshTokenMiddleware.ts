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
  constructor(
    private readonly loadUser: LoadUser,
    private readonly roles: string[]
  ) {}
  private parseCookies(cookieHeader: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      const name = parts[0].trim();
      const value = parts.slice(1).join("=").trim();
      cookies[name] = value;
    });

    return cookies;
  }
  private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const cookies = this.parseCookies(httpRequest?.headers?.cookie || "");
      const refreshToken = cookies?.refreshToken;
      if (!refreshToken) {
        return forbidden(new AccessDeniedError());
      }
      const decoded = await this.verifyToken(refreshToken, env.jwtRefreshSecret);
      if (!decoded) {
        return unauthorized();
      }
      const { _id } = decoded;
      if (!_id) {
        return unauthorized();
      }
      const query = {
        fields: {
          _id: env.database === "mongodb" ? new ObjectId(_id) : _id,
        },
        options: { projection: { password: 0 } },
      };
      if (env.database === "mongodb") {
        Object.assign(query.fields, { role: { $in: this.roles } });
      }
      const user = await this.loadUser(query);
      if (!user) {
        return forbidden(new AccessDeniedError());
      }
      return ok({ userId: user?._id, userLogged: user });
    } catch (error) {
      return serverError(error);
    }
  }
}
