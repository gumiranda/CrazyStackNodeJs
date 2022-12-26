import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateOwnerController } from "./updateOwnerController";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateOwnerController", () => {
  let testInstance: UpdateOwnerController;
  let updateOwner: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateOwner = jest.fn();
    updateOwner.mockResolvedValue({
      ...fakeOwnerEntity,
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
    testInstance = new UpdateOwnerController(
      validationQuery,
      validationBody,
      updateOwner
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeOwnerEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeOwnerEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateOwner with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOwnerEntity,
      query: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateOwner).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeOwnerEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeOwnerEntity
    );
    expect(updateOwner).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateOwner throw", async () => {
    updateOwner.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeOwnerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeOwnerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
