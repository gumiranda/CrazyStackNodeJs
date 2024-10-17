import { Repository } from "@/application/infra/contracts/repository";
import { TweetData, TweetPaginated } from "@/slices/social-network/tweet/entities";
import {
  AddTweetRepository,
  DeleteTweetRepository,
  LoadTweetByPageRepository,
  LoadTweetRepository,
  UpdateTweetRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class TweetRepository
  implements
    AddTweetRepository,
    DeleteTweetRepository,
    LoadTweetByPageRepository,
    LoadTweetRepository,
    UpdateTweetRepository
{
  constructor(private readonly repository: Repository) {}
  async addTweet(tweet: TweetData): Promise<TweetData | null> {
    return this.repository.add(tweet);
  }
  async deleteTweet(query: Query): Promise<TweetData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadTweetByPage(query: Query): Promise<TweetPaginated | null> {
    const tweets = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { tweets, total };
  }
  async loadTweet(query: Query): Promise<TweetData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {}, false);
  }
  async updateTweet(query: Query, data: TweetData): Promise<TweetData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
