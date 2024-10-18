import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddTweetlikeController } from "./addTweetlikeController";
import { fakeTweetlikeEntity } from "@/slices/tweetlike/entities/TweetlikeEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddTweetlikeController", () => {
  let testInstance: AddTweetlikeController;
  let addTweetlike: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTweetlike = jest.fn();
    addTweetlike.mockResolvedValue({
      ...fakeTweetlikeEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddTweetlikeController(validation, addTweetlike);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeTweetlikeEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeTweetlikeEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addTweetlike with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTweetlikeEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTweetlikeEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addTweetlike).toHaveBeenCalledWith({
      ...fakeTweetlikeEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addTweetlike).toHaveBeenCalledTimes(1);
  });
  test("should throws if addTweetlike throw", async () => {
    addTweetlike.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTweetlikeEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeTweetlikeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
