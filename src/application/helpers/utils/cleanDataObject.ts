export const cleanDataObject = ({
  forbiddenFields,
  allowedFields,
  bodyObject,
}: CleanDataObjectInput) => {
  const cleanObject: any = {};
  Object.keys(bodyObject).forEach((key) => {
    if (forbiddenFields.includes(key)) {
      return;
    }
    if (allowedFields.includes(key)) {
      cleanObject[key] = bodyObject[key];
    }
  });
  return cleanObject;
};
type CleanDataObjectInput = {
  forbiddenFields: string[];
  allowedFields: string[];
  bodyObject: any;
};
