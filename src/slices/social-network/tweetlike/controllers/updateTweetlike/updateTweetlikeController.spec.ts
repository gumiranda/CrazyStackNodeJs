import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateTweetlikeController } from "./updateTweetlikeController";
import { fakeTweetlikeEntity } from "@/slices/social-network/tweetlike/entities/TweetlikeEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateTweetlikeController", () => {
  let testInstance: UpdateTweetlikeController;
  let updateTweetlike: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTweetlike = jest.fn();
    updateTweetlike.mockResolvedValue({
      ...fakeTweetlikeEntity,
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
    testInstance = new UpdateTweetlikeController(
      validationQuery,
      validationBody,
      updateTweetlike
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeTweetlikeEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeTweetlikeEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeTweetlikeEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeTweetlikeEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateTweetlike with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTweetlikeEntity,
      query: fakeTweetlikeEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTweetlikeEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateTweetlike).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeTweetlikeEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeTweetlikeEntity
    );
    expect(updateTweetlike).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateTweetlike throw", async () => {
    updateTweetlike.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTweetlikeEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("userSlug")]);
    const httpResponse = await testInstance.execute({ body: fakeTweetlikeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("userSlug")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("userSlug")]);
    const httpResponse = await testInstance.execute({ query: fakeTweetlikeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("userSlug")]));
  });
});
