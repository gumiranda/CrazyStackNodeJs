import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadCustomerByPageController } from "./loadCustomerByPageController";
import {
  fakeCustomerEntity,
  fakeCustomerPaginated,
} from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadCustomerByPageController", () => {
  let testInstance: LoadCustomerByPageController;
  let loadCustomerByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCustomerByPage = jest.fn();
    loadCustomerByPage.mockResolvedValue(fakeCustomerPaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQueryParams = { _id: fakeCustomerEntity._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadCustomerByPageController(validation, loadCustomerByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadCustomerByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCustomerPaginated));
    expect(loadCustomerByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
    });
    expect(loadCustomerByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadCustomerByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCustomerPaginated));
    expect(loadCustomerByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: -1 }, page: fakeRestQuery?.page },
    });
    expect(loadCustomerByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadCustomerByPage with correct params without http query", async () => {
    const result = await testInstance.execute({
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeCustomerPaginated));
  });
  test("should throws if loadCustomerByPage throw", async () => {
    loadCustomerByPage.mockRejectedValueOnce(new Error("error"));
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
