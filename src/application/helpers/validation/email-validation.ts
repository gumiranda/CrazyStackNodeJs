import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";
import { env } from "@/application/infra/config/env";

export class EmailValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    const regexEmail = new RegExp(/^\w+([-+,']\w+)*@\w+([-,]\w+)*\.\w+([-.]\w+)*$/);
    if (!regexEmail.test(input[this.fieldName])) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
export const isValidUUID = (uuid: string) => {
  if (env.database === "mongodb") {
    return uuid?.length > 20;
  }
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};
