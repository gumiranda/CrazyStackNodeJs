import {
  Validation,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  numberFields,
  NumberValidation,
  booleanFields,
  BooleanValidation,
  ValidationComposite,
} from "@/application/helpers";

export const makeValidationComposite = (requiredFields: Array<string>): Validation => {
  const validations: Validation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  if (requiredFields?.includes?.("passwordConfirmation")) {
    validations.push(new CompareFieldsValidation("password", "passwordConfirmation"));
  }
  if (requiredFields?.includes?.("email")) {
    validations.push(new EmailValidation("email"));
  }
  for (const currentNumberField of numberFields) {
    if (requiredFields?.includes?.(currentNumberField)) {
      validations.push(new NumberValidation(currentNumberField));
    }
  }
  for (const currentBooleanField of booleanFields) {
    if (requiredFields?.includes?.(currentBooleanField)) {
      validations.push(new BooleanValidation(currentBooleanField));
    }
  }
  return new ValidationComposite(validations);
};
