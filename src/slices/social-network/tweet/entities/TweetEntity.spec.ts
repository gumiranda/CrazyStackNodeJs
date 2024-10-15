import { TweetEntity } from "./TweetEntity";
import MockDate from "mockdate";

export const fakeTweetEntity = {
  _id: "123",
  createdById: "123",
  userSlug: "fakeTweetEntity",
  createdAt: new Date(),
  updatedAt: new Date(),
  body: "fakeTweetEntity",
  image: "fakeTweetEntity",
  answerOf: 123,
};
export const fakeTweetPaginated = {
  total: 11,
  tweets: [
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
    fakeTweetEntity,
  ],
};

describe("Tweet", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new TweetEntity(fakeTweetEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeTweetEntity,
      _id: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
