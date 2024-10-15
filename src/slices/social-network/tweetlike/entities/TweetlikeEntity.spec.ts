import { TweetlikeEntity } from "./TweetlikeEntity";
import MockDate from "mockdate";

export const fakeTweetlikeEntity = {
  _id: "123",
  createdById: "123",
  userSlug: "fakeTweetlikeEntity",
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeTweetlikePaginated = {
  total: 11,
  tweetlikes: [
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
    fakeTweetlikeEntity,
  ],
};

describe("Tweetlike", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new TweetlikeEntity(fakeTweetlikeEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeTweetlikeEntity,
      _id: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
