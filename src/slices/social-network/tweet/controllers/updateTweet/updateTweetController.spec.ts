import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateTweetController } from "./updateTweetController";
import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateTweetController", () => {
  let testInstance: UpdateTweetController;
  let updateTweet: jest.Mock;
  let loadTweet: jest.Mock;
  let upsertTrend: jest.Mock;
  let removeTrend: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTweet = jest.fn();
    loadTweet = jest.fn();
    upsertTrend = jest.fn();
    removeTrend = jest.fn();
    updateTweet.mockResolvedValue({
      ...fakeTweetEntity,
      createdById: fakeUserEntity?._id,
    });

    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateTweetController(
      validationQuery,
      validationBody,
      updateTweet,
      loadTweet,
      upsertTrend,
      removeTrend
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeTweetEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeTweetEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeTweetEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeTweetEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateTweet with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTweetEntity,
      query: fakeTweetEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTweetEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateTweet).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeTweetEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeTweetEntity
    );
    expect(updateTweet).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateTweet throw", async () => {
    updateTweet.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTweetEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("userSlug")]);
    const httpResponse = await testInstance.execute({ body: fakeTweetEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("userSlug")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("userSlug")]);
    const httpResponse = await testInstance.execute({ query: fakeTweetEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("userSlug")]));
  });
});
