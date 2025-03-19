import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdatePlaceController } from "./updatePlaceController";
import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdatePlaceController", () => {
  let testInstance: UpdatePlaceController;
  let updatePlace: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updatePlace = jest.fn();
    updatePlace.mockResolvedValue({
      ...fakePlaceEntity,
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
    testInstance = new UpdatePlaceController(
      validationQuery,
      validationBody,
      updatePlace
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakePlaceEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakePlaceEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakePlaceEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakePlaceEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updatePlace with correct params", async () => {
    const result = await testInstance.execute({
      body: fakePlaceEntity,
      query: fakePlaceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakePlaceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updatePlace).toHaveBeenCalledWith(
       {
        fields: {
         ...fakePlaceEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakePlaceEntity
    );
    expect(updatePlace).toHaveBeenCalledTimes(1);
  });
  test("should throws if updatePlace throw", async () => {
    updatePlace.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakePlaceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakePlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakePlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
