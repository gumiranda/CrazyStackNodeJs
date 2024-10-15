import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddTweetController } from "./addTweetController";
import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddTweetController", () => {
  let testInstance: AddTweetController;
  let addTweet: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTweet = jest.fn();
    addTweet.mockResolvedValue({
      ...fakeTweetEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddTweetController(validation, addTweet);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeTweetEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeTweetEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addTweet with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTweetEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTweetEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addTweet).toHaveBeenCalledWith({
      ...fakeTweetEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addTweet).toHaveBeenCalledTimes(1);
  });
  test("should throws if addTweet throw", async () => {
    addTweet.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTweetEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("userSlug")]);
    const httpResponse = await testInstance.execute({ body: fakeTweetEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("userSlug")]));
  });
});
