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
import { whiteLabel } from "@/application/infra/config/whiteLabel";
export class TweetlikeRepository
  implements
    AddTweetlikeRepository,
    DeleteTweetlikeRepository,
    LoadTweetlikeByPageRepository,
    LoadTweetlikeRepository,
    UpdateTweetlikeRepository
{
  constructor(
    private readonly repository: Repository,
    private readonly tweettweetlikeRepository?: Repository
  ) {}
  async addTweetlike(data: TweetlikeData): Promise<TweetlikeData | null> {
    const tweetlike = await this.repository.add(data);
    if (
      tweetlike?._id &&
      whiteLabel.database === "postgres" &&
      this.tweettweetlikeRepository
    ) {
      const tweettweetlike = await this.tweettweetlikeRepository.add({
        tweetlikeId: tweetlike._id,
        userId: tweetlike.createdById,
        tweetId: tweetlike.tweetId,
      });
      if (!tweettweetlike?._id) {
        await this.repository.deleteOne({ _id: tweetlike._id });
        return null;
      }
    }
    return tweetlike;
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
