import { TweetEntity } from "./TweetEntity";
import MockDate from "mockdate";

export const fakeTweetEntity = {
  _id: "123",
  createdById: "123",
  userSlug: "fakeTweetEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
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
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
