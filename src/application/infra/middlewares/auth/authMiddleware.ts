import jwt from "jsonwebtoken";
import {
  calculateDaysToNextPayment,
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases";
import { AccessDeniedError } from "@/application/errors";
import { env } from "@/application/infra/config";
import { ObjectId } from "mongodb";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadUser: LoadUser,
    private readonly roles: string[]
  ) {}
  private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const authHeader = httpRequest?.headers?.["authorization"];
      if (authHeader) {
        const [, accessToken] = authHeader?.split?.(" ") ?? [];
        if (accessToken) {
          const decoded = await this.verifyToken(accessToken, env.jwtSecret);
          if (!decoded) {
            return unauthorized();
          }
          const { _id } = decoded;

          const user: any = await this.loadUser(getQuery({ roles: this.roles, _id }));
          const payday = user?.payDay || user?.payday;
          if (user && payday) {
            const daysToNextPayment = calculateDaysToNextPayment(payday);
            if (-30 < daysToNextPayment || user?.role !== "owner") {
              return ok({ userId: user?._id, userLogged: user, daysToNextPayment });
            }
          }
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
const getQuery = ({ roles, _id }: any) => {
  try {
    const query = {
      fields: {
        _id: new ObjectId(_id),
        role: { $in: roles },
      },
      options: { projection: { password: 0 } },
    };
    return query;
  } catch (error) {
    return {
      fields: {
        _id,
        // role: { $in: roles },
      },
      options: { projection: { password: 0 } },
    };
  }
};
