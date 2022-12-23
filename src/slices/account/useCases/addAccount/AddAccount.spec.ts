import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { AccountEntity } from "@/slices/account/entities";
import {
  AddAccountRepository,
  DeleteAccountRepository,
} from "@/slices/account/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addAccount } from "./AddAccount";

describe("addAccount", () => {
  let testInstance: any;
  let addAccountRepository: MockProxy<AddAccountRepository & DeleteAccountRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addAccountRepository = mock();
    addAccountRepository.addAccount.mockResolvedValue(fakeAccountEntity);
    addAccountRepository.deleteAccount.mockResolvedValue(fakeAccountEntity);
  });
  beforeEach(() => {
    testInstance = addAccount(addAccountRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addAccount of AddAccountRepository with correct values", async () => {
    await testInstance(fakeAccountEntity);
    expect(addAccountRepository.addAccount).toHaveBeenCalledWith(
      new AccountEntity(fakeAccountEntity)
    );
    expect(addAccountRepository.addAccount).toHaveBeenCalledTimes(1);
  });
  it("should return a new account created when addAccountRepository insert it", async () => {
    const account = await testInstance(fakeAccountEntity);
    expect(account).toEqual(fakeAccountEntity);
  });
  it("should return null a new account created when addAccountRepository insert it", async () => {
    addAccountRepository.addAccount.mockResolvedValue(null);
    const account = await testInstance(fakeAccountEntity);
    expect(account).toBeNull();
  });
  it("should rethrow if addAccount of AddAccountRepository throws", async () => {
    addAccountRepository.addAccount.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeAccountEntity)).rejects.toThrowError("any_error");
  });
});
