import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class NumberValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (isNaN(Number(input[this.fieldName]))) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
