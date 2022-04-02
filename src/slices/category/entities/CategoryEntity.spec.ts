import { CategoryEntity } from "./CategoryEntity";
import MockDate from "mockdate";

export const fakeCategoryEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeCategoryEntity",
    description: "Animi temporibus voluptatem corrupti quas ab voluptatem delectus.",
    image: "Pariatur quos accusantium aut quod ad enim odio blanditiis quia.",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakeCategoryPaginated = {
    total: 11,
    categorys: [
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
        fakeCategoryEntity,
    ],
};

describe("Category", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new CategoryEntity(fakeCategoryEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeCategoryEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
