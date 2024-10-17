/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadTweet } from "@/slices/social-network/tweet/useCases";

export class LoadTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTweet: LoadTweet
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetLoaded: any = await this.loadTweet({
      fields: httpRequest?.query,
      options: {
        include: {
          createdBy: true, //pg
          tweet: true, //pg
          tweetlike: true, //pg
        },
      },
    });
    if (Array.isArray(tweetLoaded) && tweetLoaded?.[0]) {
      const data = {
        ...tweetLoaded?.[0],
      };
      const formattedData = formatFieldsByPrefix(data, prefixes);
      const final = {
        ...formattedData,
        tweetlike:
          tweetLoaded?.[0]?.tweettweetliketweetlikeId?.length > 0
            ? tweetLoaded?.map?.(
                ({ tweettweetliketweetlikeId, tweettweetlikeuserId }: any) => ({
                  userId: tweettweetlikeuserId,
                  tweetlikeId: tweettweetliketweetlikeId,
                })
              )
            : null,
      };
      return ok(final);
    }
    return ok(tweetLoaded);
  }
}
const prefixes = ["users", "tweettweetlike", "tweet"];

function formatFieldsByPrefix(obj: any, prefixes: string[]) {
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
