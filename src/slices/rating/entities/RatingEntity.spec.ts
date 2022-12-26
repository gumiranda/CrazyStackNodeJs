import { RatingEntity } from "./RatingEntity";
import MockDate from "mockdate";

export const fakeRatingEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeRatingEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ratingType: "any_ratingType",
    ratings: [{ rating: "Excelente", stars: 5 }],
};
export const fakeRatingPaginated = {
    total: 11,
    ratings: [
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
        fakeRatingEntity,
    ],
};

describe("Rating", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new RatingEntity(fakeRatingEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeRatingEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
