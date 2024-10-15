import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { DeleteTweetController } from "./deleteTweetController";
import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("DeleteTweetController", () => {
  let testInstance: DeleteTweetController;
  let deleteTweet: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteTweet = jest.fn();
    deleteTweet.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeTweetEntity._id };
    testInstance = new DeleteTweetController(validation, deleteTweet);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteTweet with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(true));
    expect(deleteTweet).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deleteTweet).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteTweet throw", async () => {
    deleteTweet.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
});
