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
  test("Should deleteMany user with success", async () => {
    const sut = makeSut();
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const userDeleted = await sut.deleteMany({ _id: insertedId });
    expect(userDeleted).toBeTruthy();
  });
  test("Should deleteMany user fails", async () => {
    const sut = makeSut();
    const userDeleted = await sut.deleteMany({ _id: new ObjectId() });
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
  test("Should return an user getCount success", async () => {
    const sut = makeSut();
    const { insertedId } = await userCollection.insertOne({
      ...mockUser,
      name: "John Doe",
    });
    const result = await sut.getCount({ _id: insertedId });
    expect(result).toEqual(1);
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
  test("Should return a users paginated when getPaginate by id success", async () => {
    const sut = makeSut();
    const { insertedId } = await userCollection.insertOne({
      name: "Fulano",
      createdAt: new Date(),
    });
    const result = await sut.getPaginate(
      1,
      { _id: new ObjectId(insertedId) },
      { createdAt: -1 },
      10,
      {}
    );
    expect(result).toHaveLength(1);
  });
  test("Should update user with success", async () => {
    const sut = makeSut();
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const userUpdated = await sut.update({ _id: insertedId }, { name: "New John Doe" });
    expect(userUpdated).toBeTruthy();
    expect(userUpdated).toEqual({ _id: insertedId, ...user, name: "New John Doe" });
  });
  test("Should call update method with correct values", async () => {
    const sut = makeSut();
    const spySut = jest.spyOn(sut, "update");
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    await sut.update({ _id: insertedId }, { name: "New John Doe" });
    expect(spySut).toHaveBeenCalledWith({ _id: insertedId }, { name: "New John Doe" });
  });
  test("Should throws if update throw a exception", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "update").mockRejectedValueOnce(new Error());
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const promise = sut.update({ _id: insertedId }, { name: "New John Doe" });
    expect(promise).rejects.toThrow();
  });
  test("should return null if user update fails", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "updateOne").mockReturnValueOnce(Promise.resolve(null));
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const promise = sut.update({ _id: insertedId }, { name: "New John Doe" });
    await expect(promise).resolves.toBeNull();
  });
  test("Should increment user with wrong way", async () => {
    const sut = makeSut();
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const userincrementd = sut.increment({ _id: insertedId }, { name: "New John Doe" });
    expect(userincrementd).toBeTruthy();
    await expect(userincrementd).rejects.toThrow(
      'Cannot increment with non-numeric argument: {name: "New John Doe"}'
    );
  });
  test("Should increment user with success", async () => {
    const sut = makeSut();
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      appointments: 0,
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const userincrementd = await sut.increment({ _id: insertedId }, { appointments: 1 });
    expect(userincrementd).toBeTruthy();
    expect(userincrementd).toEqual({ _id: insertedId, ...user, appointments: 1 });
  });
  test("Should call increment method with correct values", async () => {
    const sut = makeSut();
    const spySut = jest.spyOn(sut, "increment");
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
      appointments: 0,
    };
    const { insertedId } = await userCollection.insertOne(user);
    await sut.increment({ _id: insertedId }, { appointments: 1 });
    expect(spySut).toHaveBeenCalledWith({ _id: insertedId }, { appointments: 1 });
  });
  test("Should throws if increment throw a exception", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "increment").mockRejectedValueOnce(new Error());
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const promise = sut.increment({ _id: insertedId }, { name: "New John Doe" });
    expect(promise).rejects.toThrow();
  });
  test("should return null if user increment fails", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "incrementOne").mockReturnValueOnce(Promise.resolve(null));
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const promise = sut.increment({ _id: insertedId }, { name: "New John Doe" });
    await expect(promise).resolves.toBeNull();
  });
  test("Should aggregate user with success", async () => {
    const sut = makeSut();
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const useraggregated = await sut.aggregate([{ $match: { _id: insertedId } }]);
    expect(useraggregated).toBeTruthy();
    expect(useraggregated).toEqual(useraggregated);
  });
  test("Should call aggregate method with correct values", async () => {
    const sut = makeSut();
    const spySut = jest.spyOn(sut, "aggregate");
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    await sut.aggregate([{ $match: { _id: insertedId } }]);
    expect(spySut).toHaveBeenCalledWith([{ $match: { _id: insertedId } }]);
  });
  test("Should throws if aggregate throw a exception", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "aggregate").mockRejectedValueOnce(new Error());
    const user = {
      name: "John Doe",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const { insertedId } = await userCollection.insertOne(user);
    const promise = sut.aggregate([{ $match: { _id: insertedId } }]);
    expect(promise).rejects.toThrow();
  });
});
