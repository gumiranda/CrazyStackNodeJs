import { Validation } from "@/application/helpers/contracts";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {
    this.validations = validations;
  }
  validate(input: any): Error[] {
    const arrayErrors = [];
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        arrayErrors.push(...error);
      }
    }
    return arrayErrors;
  }
}
