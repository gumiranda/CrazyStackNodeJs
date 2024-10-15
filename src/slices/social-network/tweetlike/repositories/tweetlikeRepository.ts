import { Repository } from "@/application/infra/contracts/repository";
import {
  TweetlikeData,
  TweetlikePaginated,
} from "@/slices/social-network/tweetlike/entities";
import {
  AddTweetlikeRepository,
  DeleteTweetlikeRepository,
  LoadTweetlikeByPageRepository,
  LoadTweetlikeRepository,
  UpdateTweetlikeRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class TweetlikeRepository
  implements
    AddTweetlikeRepository,
    DeleteTweetlikeRepository,
    LoadTweetlikeByPageRepository,
    LoadTweetlikeRepository,
    UpdateTweetlikeRepository
{
  constructor(private readonly repository: Repository) {}
  async addTweetlike(tweetlike: TweetlikeData): Promise<TweetlikeData | null> {
    return this.repository.add(tweetlike);
  }
  async deleteTweetlike(query: Query): Promise<TweetlikeData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadTweetlikeByPage(query: Query): Promise<TweetlikePaginated | null> {
    const tweetlikes = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { tweetlikes, total };
  }
  async loadTweetlike(query: Query): Promise<TweetlikeData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateTweetlike(query: Query, data: TweetlikeData): Promise<TweetlikeData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
