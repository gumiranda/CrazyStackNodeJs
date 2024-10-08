import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddPhotoController } from "./addPhotoController";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddPhotoController", () => {
  let testInstance: AddPhotoController;
  let addPhoto: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addPhoto = jest.fn();
    addPhoto.mockResolvedValue({
      ...fakePhotoEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddPhotoController(validation, addPhoto);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakePhotoEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakePhotoEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addPhoto with correct params", async () => {
    const result = await testInstance.execute({
      body: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakePhotoEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addPhoto).toHaveBeenCalledWith({
      ...fakePhotoEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addPhoto).toHaveBeenCalledTimes(1);
  });
  test("should throws if addPhoto throw", async () => {
    addPhoto.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakePhotoEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakePhotoEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
