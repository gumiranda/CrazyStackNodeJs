import { Collection } from "mongodb";
import { MongoHelper } from "./mongodb-helper";

describe("Mongo Helper", () => {
    let userCollection: Collection;
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        userCollection = await MongoHelper.getCollection("user");
        await userCollection.deleteMany({});
    });
    it("should reconnect if mongodb is down", async () => {
        let userCollection = await MongoHelper.getCollection("user");
        expect(userCollection).toBeTruthy();
        await MongoHelper.disconnect();
        userCollection = await MongoHelper.getCollection("user");
        expect(userCollection).toBeTruthy();
    });
    it("should return an session with success", async () => {
        const session = await MongoHelper.startSession();
        const transactionOptions = {
            readPreference: "primary",
            readConcern: { level: "local" },
            writeConcern: { w: "majority" },
        };
        let users: any = [];
        const userCollection = await MongoHelper.getCollection("user");
        await session.withTransaction(async () => {
            try {
                await userCollection.insertOne({
                    name: "Dona Maria",
                    email: "donamaria@hotmail.com",
                    password: "123456",
                });
            } catch (error: any) {
                await session.abortTransaction();
            }
        }, transactionOptions);
        await session.commitTransaction();
        await MongoHelper.endSession();
        users = await userCollection.find({}).toArray();
        const otherSession = await MongoHelper.getSession();
        await MongoHelper.disconnect();
        expect(otherSession).toBeNull();
        expect(users).toHaveLength(1);
    });
    it("should return mappedPassword when i pass any object", async () => {
        const userCollection = await MongoHelper.getCollection("user");
        const { insertedId } = await userCollection.insertOne({
            name: "Dona Maria",
            email: "donamaria@hotmail.com",
            password: "123456",
        });
        const user = await userCollection.findOne({ _id: insertedId });
        expect(MongoHelper.mapPassword(user)).toEqual({
            _id: insertedId,
            name: "Dona Maria",
            email: "donamaria@hotmail.com",
            password: null,
        });
    });
    it("should return mapCollectionPassword when i pass any object", async () => {
        const userCollection = await MongoHelper.getCollection("user");
        const { insertedId } = await userCollection.insertOne({
            name: "Dona Maria",
            email: "donamaria@hotmail.com",
            password: "123456",
        });
        const { insertedId: insertedId2 } = await userCollection.insertOne({
            name: "Dona Maria",
            email: "donamaria@hotmail.com",
            password: "123456",
        });
        const user1 = await userCollection.findOne({ _id: insertedId });
        const user2 = await userCollection.findOne({ _id: insertedId2 });
        expect(MongoHelper.mapCollectionPassword([user1, user2])).toEqual([
            {
                _id: insertedId,
                name: "Dona Maria",
                email: "donamaria@hotmail.com",
                password: null,
            },
            {
                _id: insertedId2,
                name: "Dona Maria",
                email: "donamaria@hotmail.com",
                password: null,
            },
        ]);
    });
});
