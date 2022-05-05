import { AccountEntity } from "./AccountEntity";
import MockDate from "mockdate";

export const fakeAccountEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeAccountEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    refreshToken: "fakeRefreshToken",
    expiresAt: "fakeExpiresAt",
};
export const fakeAccountPaginated = {
    total: 11,
    accounts: [
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
        fakeAccountEntity,
    ],
};

describe("Account", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new AccountEntity(fakeAccountEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeAccountEntity,
            _id: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
