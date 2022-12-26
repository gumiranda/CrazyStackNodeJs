import { ClientEntity } from "./ClientEntity";
import MockDate from "mockdate";

export const fakeClientEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeClientEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cpf: "11111111111",
    userId: "fakeUserId",
    phone: "2323323232",
    ownerId: "fakeOwnerId",
    birthDate: new Date(),
    appointmentsTotal: 2,
};
export const fakeClientPaginated = {
    total: 11,
    clients: [
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
        fakeClientEntity,
    ],
};

describe("Client", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new ClientEntity(fakeClientEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeClientEntity,
            _id: undefined,
            active: false,
            appointmentsTotal: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
