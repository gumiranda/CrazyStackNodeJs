import {
    mapAnyToMongoObject,
    mapQueryParamsToQueryMongo,
    MongoHelper,
} from "@/application/infra/database/mongodb";
import { Repository } from "@/application/infra/contracts/repository";
import { Collection, ObjectId } from "mongodb";
import MockDate from "mockdate";
import { MongoRepository } from "./mongo-repository";
const mockUser = {
    name: "valid_name",
    email: "valid_email@bol.com",
    password: "valid_password",
    role: "client",
    createdAt: new Date(),
    coord: [43.65, -67.008],
    payDay: new Date(),
};
describe("Mongo Repository tests", () => {
    let userCollection: Collection;
    beforeAll(async () => {
        MockDate.set(new Date());
        await MongoHelper.connect(process.env.MONGO_URL as string);
        await MongoHelper.startSession();
    });
    afterAll(async () => {
        MockDate.reset();
        await MongoHelper.endSession();
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        userCollection = await MongoHelper.getCollection("user");
        await userCollection.deleteMany({});
    });
    const makeSut = (): Repository => {
        return new MongoRepository("user");
    };
    test("Should delete user with success", async () => {
        const sut = makeSut();
        const user = {
            name: "John Doe",
            email: "any_email@mail.com",
            password: "any_password",
        };
        const { insertedId } = await userCollection.insertOne(user);
        const userDeleted = await sut.deleteOne({ _id: insertedId });
        expect(userDeleted).toBeTruthy();
    });
    test("Should delete user fails", async () => {
        const sut = makeSut();
        const userDeleted = await sut.deleteOne({ _id: new ObjectId() });
        expect(userDeleted).toBeFalsy();
    });
    test("Should return an user add success", async () => {
        const sut = makeSut();
        const user = await sut.add(mockUser);
        const userMapped = MongoHelper.mapPassword(user);
        const userArrayMapped = MongoHelper.mapCollectionPassword([user]);
        expect(user).toBeTruthy();
        expect(user._id).toBeTruthy();
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
        expect(user.role).toBe("client");
        expect(userMapped).toBeTruthy();
        expect(userMapped.password).toBeNull();
        expect(userArrayMapped[0].password).toBeNull();
    });
    test("should return null if user add fails", async () => {
        const sut = makeSut();
        jest.spyOn(sut, "insertOne").mockReturnValueOnce(Promise.resolve(null));
        const promiseUserAdded = sut.add(mockUser);
        await expect(promiseUserAdded).resolves.toBeNull();
    });
    test("should return an user getOne success", async () => {
        const sut = makeSut();
        const { insertedId } = await userCollection.insertOne(mockUser);
        const user = await sut.getOne(
            { email: mockUser.email, _id: insertedId?.toString?.() },
            { projection: { password: 0 } }
        );
        expect(user).toBeTruthy();
        expect(user._id).toBeTruthy();
        expect(user.name).toBeTruthy();
        expect(user.password).toBeUndefined();
    });
    test("Should return an user getAll success", async () => {
        const sut = makeSut();
        const { insertedId } = await userCollection.insertOne({
            ...mockUser,
            name: "John Doe",
        });
        const result = await sut.getAll({});
        expect(result).toEqual([{ ...mockUser, _id: insertedId, name: "John Doe" }]);
    });
    test("Should return a users paginated when getPaginate success", async () => {
        const sut = makeSut();
        await userCollection.insertMany([
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
            {
                name: "Fulano",
                createdAt: new Date(),
            },
        ]);
        const result = await sut.getPaginate(1, {}, { createdAt: -1 }, 10, {});
        expect(result).toHaveLength(10);
    });
});
