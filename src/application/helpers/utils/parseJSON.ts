export const parseJSON = (json: any): any => {
  try {
    const parsedJson = JSON.parse(json);
    return parsedJson;
  } catch (e) {
    return null;
  }
};
