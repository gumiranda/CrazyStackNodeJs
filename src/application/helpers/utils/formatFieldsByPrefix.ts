export function formatFieldsByPrefix(obj: any, prefixes: string[]) {
  const result: { [key: string]: any } = {};
  prefixes.forEach((prefix) => {
    result[prefix] = {};
  });
  for (const key in obj) {
    let matchedPrefix = null;
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix)) {
        matchedPrefix = prefix;
      }
    });
    if (matchedPrefix) {
      const newKey = key
        .replace(new RegExp(`^${matchedPrefix}`), "")
        .replace(/^./, (str) => str.toLowerCase());
      result[matchedPrefix][newKey] = obj[key];
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
