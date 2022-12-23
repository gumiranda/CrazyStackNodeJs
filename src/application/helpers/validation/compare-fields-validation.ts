import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }
  validate(input: any): Error[] {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return [new InvalidParamError(this.fieldToCompareName)];
    }
    return [];
  }
}
