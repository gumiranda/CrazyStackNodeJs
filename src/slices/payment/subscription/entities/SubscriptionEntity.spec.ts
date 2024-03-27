import { SubscriptionEntity } from "./SubscriptionEntity";
import MockDate from "mockdate";

export const fakeSubscriptionEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeSubscriptionEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakeSubscriptionPaginated = {
    total: 11,
    subscriptions: [
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
        fakeSubscriptionEntity,
    ],
};

describe("Subscription", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new SubscriptionEntity(fakeSubscriptionEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeSubscriptionEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
