export const cleanDataObject = (
  forbiddenFields: string[],
  allowedFields: string[],
  bodyObject: any
) => {
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
