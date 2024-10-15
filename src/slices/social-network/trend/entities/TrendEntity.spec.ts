import { TrendEntity } from "./TrendEntity";
import MockDate from "mockdate";

export const fakeTrendEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeTrendEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakeTrendPaginated = {
    total: 11,
    trends: [
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
        fakeTrendEntity,
    ],
};

describe("Trend", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new TrendEntity(fakeTrendEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeTrendEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
