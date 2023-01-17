import { PostgresRepository } from "./postgres-repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("PostgresRepository", () => {
  let postgresRepository: PostgresRepository;

  beforeEach(() => {
    postgresRepository = new PostgresRepository(prisma);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("add", () => {
    test("should add a new item to the database", async () => {
      const item = { name: "Test item" };
      const createdItem = await postgresRepository.add(item);
      expect(createdItem).toEqual({ id: expect.any(Number), name: "Test item" });
    });
  });

  describe("insertOne", () => {
    test("should insert an item to the database", async () => {
      const item = { name: "Test item" };
      const insertedItem = await postgresRepository.insertOne(item);
      expect(insertedItem).toEqual({ id: expect.any(Number), name: "Test item" });
    });
  });

  describe("update", () => {
    test("should update an item in the database", async () => {
      const item = await postgresRepository.add({ name: "Test item" });
      const updatedItem = await postgresRepository.update(
        { id: item.id },
        { name: "Updated item" }
      );
      expect(updatedItem).toEqual({ id: item.id, name: "Updated item" });
    });
  });

  describe("updateOne", () => {
    test("should update an item in the database", async () => {
      const item = await postgresRepository.add({ name: "Test item" });
      const updatedItem = await postgresRepository.updateOne(
        { id: item.id },
        { name: "Updated item" }
      );
      expect(updatedItem).toEqual({ id: item.id, name: "Updated item" });
    });
  });

  describe("incrementOne", () => {
    test("should increment an item in the database", async () => {
      const item = await postgresRepository.add({ name: "Test item", count: 0 });
      const incrementedItem = await postgresRepository.incrementOne(
        { id: item.id },
        { count: 1 }
      );
      expect(incrementedItem).toEqual({ id: item.id, name: "Test item", count: 1 });
    });
  });

  describe("increment", () => {
    test("should increment multiple items in the database", async () => {
      const item1 = await postgresRepository.add({ name: "Test item 1", count: 0 });
      const item2 = await postgresRepository.add({ name: "Test item 2", count: 0 });
      const incrementedItems = await postgresRepository.increment({}, { count: 1 });
      expect(incrementedItems).toEqual([
        { id: item1.id, name: "Test item 1", count: 1 },
        { id: item2.id, name: "Test item 2", count: 1 },
      ]);
    });
  });
  describe("deleteOne", () => {
    test("should delete an item from the database", async () => {
      const item = await postgresRepository.add({ name: "Test item" });
      const deletedItem = await postgresRepository.deleteOne({ id: item.id });
      expect(deletedItem).toEqual({ id: item.id, name: "Test item" });
    });
  });

  describe("deleteMany", () => {
    test("should delete multiple items from the database", async () => {
      const item1 = await postgresRepository.add({ name: "Test item 1" });
      const item2 = await postgresRepository.add({ name: "Test item 2" });
      const deletedItems = await postgresRepository.deleteMany({});
      expect(deletedItems).toEqual([
        { id: item1.id, name: "Test item 1" },
        { id: item2.id, name: "Test item 2" },
      ]);
    });
  });

  describe("getOne", () => {
    test("should get one item from the database", async () => {
      const item = await postgresRepository.add({ name: "Test item" });
      const foundItem = await postgresRepository.getOne({ id: item.id });
      expect(foundItem).toEqual({ id: item.id, name: "Test item" });
    });
  });

  describe("getAll", () => {
    test("should get all items from the database", async () => {
      const item1 = await postgresRepository.add({ name: "Test item 1" });
      const item2 = await postgresRepository.add({ name: "Test item 2" });
      const foundItems = await postgresRepository.getAll({});
      expect(foundItems).toEqual([
        { id: item1.id, name: "Test item 1" },
        { id: item2.id, name: "Test item 2" },
      ]);
    });
  });
  describe("aggregate", () => {
    test("should aggregate data from the database", async () => {
      for (let i = 1; i <= 5; i++) {
        await postgresRepository.add({ name: `Test item ${i}`, value: i });
      }
      const result = await postgresRepository.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: "$value" },
          },
        },
      ]);
      expect(result).toEqual([{ _id: null, totalValue: 15 }]);
    });
  });
});
