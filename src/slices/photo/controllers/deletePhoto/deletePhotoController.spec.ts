import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { DeletePhotoController } from "./deletePhotoController";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("DeletePhotoController", () => {
  let testInstance: DeletePhotoController;
  let deletePhoto: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deletePhoto = jest.fn();
    deletePhoto.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakePhotoEntity._id };
    testInstance = new DeletePhotoController(validation, deletePhoto);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deletePhoto with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(true));
    expect(deletePhoto).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deletePhoto).toHaveBeenCalledTimes(1);
  });
  test("should throws if deletePhoto throw", async () => {
    deletePhoto.mockRejectedValueOnce(new Error("error"));
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
