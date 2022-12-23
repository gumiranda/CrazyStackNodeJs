import { MissingParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (
      !input[this.fieldName] &&
      input[this.fieldName] !== 0 &&
      input[this.fieldName] !== false
    ) {
      return [new MissingParamError(this.fieldName)];
    }
    return [];
  }
}
