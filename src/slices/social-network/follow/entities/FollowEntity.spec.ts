import { FollowEntity } from "./FollowEntity";
import MockDate from "mockdate";

export const fakeFollowEntity = {
  _id: "123",
  createdById: "123",
  user1Slug: "fakeFollowEntity",
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeFollowPaginated = {
  total: 11,
  follows: [
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
    fakeFollowEntity,
  ],
};

describe("Follow", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new FollowEntity(fakeFollowEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeFollowEntity,
      _id: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
