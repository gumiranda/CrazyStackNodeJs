export function formatFieldsByPrefix(obj: any, prefixes: string[]) {
  const result: { [key: string]: any } = {};

  // Inicializa subobjetos para cada prefixo
  prefixes.forEach((prefix) => {
    result[prefix] = {};
  });

  for (const key in obj) {
    let matchedPrefix = null;

    // Encontra o prefixo correspondente para a chave
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix)) {
        matchedPrefix = prefix;
      }
    });

    if (matchedPrefix) {
      // Remove o prefixo e transforma a primeira letra do campo restante em minúscula
      const newKey = key
        .replace(new RegExp(`^${matchedPrefix}`), "")
        .replace(/^./, (str) => str.toLowerCase());
      result[matchedPrefix][newKey] = obj[key];
    } else {
      result[key] = obj[key]; // Mantém as chaves que não têm o prefixo
    }
  }

  return result;
}
