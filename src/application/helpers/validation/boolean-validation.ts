import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class BooleanValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (input[this.fieldName] !== true && input[this.fieldName] !== false) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
