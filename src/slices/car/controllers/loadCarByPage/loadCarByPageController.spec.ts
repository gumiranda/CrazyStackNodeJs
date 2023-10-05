import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadCarByPageController } from "./loadCarByPageController";
import { fakeCarEntity, fakeCarPaginated } from "@/slices/car/entities/CarEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadCarByPageController", () => {
  let testInstance: LoadCarByPageController;
  let loadCarByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCarByPage = jest.fn();
    loadCarByPage.mockResolvedValue(fakeCarPaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQueryParams = { _id: fakeCarEntity._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadCarByPageController(validation, loadCarByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadCarByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCarPaginated));
    expect(loadCarByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
    });
    expect(loadCarByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadCarByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCarPaginated));
    expect(loadCarByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: -1 }, page: fakeRestQuery?.page },
    });
    expect(loadCarByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadCarByPage with correct params without http query", async () => {
    const result = await testInstance.execute({
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCarPaginated));
  });
  test("should throws if loadCarByPage throw", async () => {
    loadCarByPage.mockRejectedValueOnce(new Error("error"));
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
