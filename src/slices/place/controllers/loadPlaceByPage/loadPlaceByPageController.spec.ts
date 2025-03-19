import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadPlaceByPageController } from "./loadPlaceByPageController";
import {
  fakePlaceEntity,
  fakePlacePaginated,
} from "@/slices/place/entities/PlaceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadPlaceByPageController", () => {
  let testInstance: LoadPlaceByPageController;
  let loadPlaceByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadPlaceByPage = jest.fn();
    loadPlaceByPage.mockResolvedValue(fakePlacePaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQueryParams = { _id: fakePlaceEntity._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadPlaceByPageController(validation, loadPlaceByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadPlaceByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakePlacePaginated));
    expect(loadPlaceByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: {
        sort: { [fakeRestQuery?.sortBy]: 1 },
        page: fakeRestQuery?.page,
        limitPerPage: 10,
      },
    });
    expect(loadPlaceByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadPlaceByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakePlacePaginated));
    expect(loadPlaceByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: {
        sort: { [fakeRestQuery?.sortBy]: -1 },
        page: fakeRestQuery?.page,
        limitPerPage: 10,
      },
    });
    expect(loadPlaceByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadPlaceByPage with correct params without http query", async () => {
    const result = await testInstance.execute({
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakePlacePaginated));
  });
  test("should throws if loadPlaceByPage throw", async () => {
    loadPlaceByPage.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("page")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("page")]));
  });
});
