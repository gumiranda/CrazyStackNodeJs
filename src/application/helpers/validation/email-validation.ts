import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

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
