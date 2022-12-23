import { RatingResultAverage, RatingResultEntity } from "./RatingResultEntity";
import MockDate from "mockdate";

export const fakeRatingResultEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeRatingResultEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ratingForId: "fakeUserId",
  ratingType: "fakeRatingId",
  requestId: "fakerequestId",
  ratingId: "fakerequestId",
  ratings: [{ rating: "Excelente", stars: 5, comment: "", count: 0, percent: 0 }],
};
export const fakeRatingResultAverage: RatingResultAverage = {
  starsAvg: 4.5,
  ratingId: "idFake",
  ratingType: "idFake",
  createdAt: new Date(),
  ratings: [
    {
      count: 2,
      percent: 50,
      stars: 5,
      rating: "Ótimo",
      comments: [{ ratingText: "Mt bom", ratingStars: 5 }],
    },
    {
      count: 2,
      percent: 50,
      stars: 4,
      rating: "Bom",
      comments: [{ ratingText: "bonzim", ratingStars: 4 }],
    },
    {
      count: 0,
      percent: 0,
      stars: 3,
      rating: "Horrível",
      comments: [],
    },
    {
      count: 0,
      percent: 0,
      stars: 2,
      rating: "Horrível demais",
      comments: [],
    },
    {
      count: 0,
      percent: 0,
      stars: 1,
      rating: "Tenebroso",
      comments: [],
    },
  ],
};
export const fakeRatingResultPaginated = {
  total: 11,
  ratingResults: [
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
    fakeRatingResultEntity,
  ],
};

describe("RatingResult", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new RatingResultEntity(fakeRatingResultEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeRatingResultEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
