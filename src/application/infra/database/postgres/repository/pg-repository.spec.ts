const mockQuery = jest.fn();
const mockRelease = jest.fn();
const mockClient = {
  query: mockQuery,
  release: mockRelease,
};

jest.mock("@/application/infra/database/postgres/databaseConfig", () => ({
  connect: jest.fn().mockResolvedValue(mockClient),
}));

jest.mock("@/application/infra/contracts", () => ({
  Repository: class {
    constructor() {}
  },
}));

import { PostgresRepository } from "./pg-repository";

describe("PostgresRepository", () => {
  let repository: PostgresRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PostgresRepository("test_table");
  });

  describe("buildWhereClause", () => {
    test("should build WHERE clause with single field", () => {
      const result = repository.buildWhereClause({ name: "test" });
      expect(result.whereClause).toBe('"test_table"."name" = $1');
      expect(result.values).toEqual(["test"]);
    });

    test("should build WHERE clause with multiple fields", () => {
      const result = repository.buildWhereClause({ name: "test", active: true });
      expect(result.whereClause).toBe(
        '"test_table"."name" = $1 AND "test_table"."active" = $2'
      );
      expect(result.values).toEqual(["test", true]);
    });

    test("should return empty clause for empty query", () => {
      const result = repository.buildWhereClause({});
      expect(result.whereClause).toBe("");
      expect(result.values).toEqual([]);
    });
  });

  describe("insertOne", () => {
    test("should insert a record and return it", async () => {
      const data = { name: "test", active: true };
      mockQuery.mockResolvedValueOnce({ rows: [{ _id: "1", ...data }] });
      const result = await repository.insertOne(data);
      expect(result).toEqual({ _id: "1", name: "test", active: true });
      expect(mockQuery).toHaveBeenCalledWith(
        'INSERT INTO "test_table" ("name", "active") VALUES ($1, $2) RETURNING *',
        ["test", true]
      );
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("insert error"));
      await expect(repository.insertOne({ name: "test" })).rejects.toThrow("insert error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("add", () => {
    test("should call insertOne and return result", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ _id: "1", name: "test" }] });
      const result = await repository.add({ name: "test" });
      expect(result).toEqual({ _id: "1", name: "test" });
    });
  });

  describe("updateOne", () => {
    test("should update a record by id and return it", async () => {
      const data = { name: "updated" };
      mockQuery.mockResolvedValueOnce({ rows: [{ _id: "1", name: "updated" }] });
      const result = await repository.updateOne("1", data);
      expect(result).toEqual({ _id: "1", name: "updated" });
      expect(mockQuery).toHaveBeenCalledWith(
        'UPDATE "test_table" SET "name" = $2 WHERE "_id" = $1 RETURNING *',
        ["1", "updated"]
      );
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("update error"));
      await expect(repository.updateOne("1", { name: "test" })).rejects.toThrow(
        "update error"
      );
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    test("should update with query and data", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ _id: "1", name: "updated" }] });
      const result = await repository.update({ _id: "1" }, { name: "updated" });
      expect(result).toEqual({ _id: "1", name: "updated" });
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("update error"));
      await expect(
        repository.update({ _id: "1" }, { name: "test" })
      ).rejects.toThrow("update error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("upsertAndPush", () => {
    test("should append to existing array and return updated record", async () => {
      // BEGIN
      mockQuery.mockResolvedValueOnce(undefined);
      // SELECT
      mockQuery.mockResolvedValueOnce({
        rows: [{ tags: ["old"] }],
      });
      // UPDATE
      mockQuery.mockResolvedValueOnce({
        rows: [{ _id: "1", tags: ["old", '"new"'] }],
      });
      // COMMIT
      mockQuery.mockResolvedValueOnce(undefined);

      const result = await repository.upsertAndPush(
        { userId: "1", type: "tag" },
        {},
        { tags: "new" }
      );
      expect(result).toEqual({ _id: "1", tags: ["old", '"new"'] });
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should create new array when column is not an array", async () => {
      mockQuery.mockResolvedValueOnce(undefined); // BEGIN
      mockQuery.mockResolvedValueOnce({ rows: [{ tags: null }] }); // SELECT
      mockQuery.mockResolvedValueOnce({
        rows: [{ _id: "1", tags: ['"new"'] }],
      }); // UPDATE
      mockQuery.mockResolvedValueOnce(undefined); // COMMIT

      const result = await repository.upsertAndPush(
        { userId: "1", type: "tag" },
        {},
        { tags: "new" }
      );
      expect(result).toBeTruthy();
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should rollback on error", async () => {
      mockQuery.mockResolvedValueOnce(undefined); // BEGIN
      mockQuery.mockRejectedValueOnce(new Error("select error")); // SELECT fails
      mockQuery.mockResolvedValueOnce(undefined); // ROLLBACK

      await expect(
        repository.upsertAndPush({ userId: "1", type: "tag" }, {}, { tags: "new" })
      ).rejects.toThrow("select error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("increment", () => {
    test("should increment fields and return rowCount", async () => {
      mockQuery.mockResolvedValueOnce({ rowCount: 1 });
      const result = await repository.increment({ _id: "1" }, { views: 1 });
      expect(result).toBe(1);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("increment error"));
      await expect(
        repository.increment({ _id: "1" }, { views: 1 })
      ).rejects.toThrow("increment error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("deleteOne", () => {
    test("should call deleteMany with the same fields", async () => {
      mockQuery.mockResolvedValueOnce({ rowsCount: 1 });
      const result = await repository.deleteOne({ _id: "1" });
      expect(mockQuery).toHaveBeenCalledWith(
        'DELETE FROM "test_table" WHERE "_id" = $1',
        ["1"]
      );
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("deleteMany", () => {
    test("should delete records matching query", async () => {
      mockQuery.mockResolvedValueOnce({ rowsCount: 3 });
      const result = await repository.deleteMany({ active: false });
      expect(mockQuery).toHaveBeenCalledWith(
        'DELETE FROM "test_table" WHERE "active" = $1',
        [false]
      );
      expect(result).toBe(3);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("delete error"));
      await expect(
        repository.deleteMany({ active: false })
      ).rejects.toThrow("delete error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("getTableFields", () => {
    test("should return column names excluding password", async () => {
      const fakeClient = {
        query: jest.fn().mockResolvedValue({
          rows: [
            { column_name: "_id" },
            { column_name: "name" },
            { column_name: "password" },
            { column_name: "email" },
          ],
        }),
      };
      const result = await repository.getTableFields("test_table", fakeClient);
      expect(result).toEqual(["_id", "name", "email"]);
    });

    test("should return empty array when no rows", async () => {
      const fakeClient = {
        query: jest.fn().mockResolvedValue({ rows: 0 }),
      };
      const result = await repository.getTableFields("test_table", fakeClient);
      expect(result).toEqual([]);
    });
  });

  describe("getOne", () => {
    test("should return a single record matching query", async () => {
      mockQuery
        .mockResolvedValueOnce({
          rows: [{ _id: "1", name: "test" }],
        });
      const result = await repository.getOne({ _id: "1" }, {});
      expect(result).toEqual({ _id: "1", name: "test" });
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should return undefined when no record matches", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await repository.getOne({ _id: "999" }, {});
      expect(result).toBeUndefined();
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should apply projection exclusion", async () => {
      // getTableFields query
      mockQuery.mockResolvedValueOnce({
        rows: [
          { column_name: "_id" },
          { column_name: "name" },
          { column_name: "password" },
        ],
      });
      // actual query
      mockQuery.mockResolvedValueOnce({
        rows: [{ _id: "1", name: "test" }],
      });
      const result = await repository.getOne(
        { _id: "1" },
        { projection: { password: 0 } }
      );
      expect(result).toEqual({ _id: "1", name: "test" });
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should return all rows when returnOneRegister is false", async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [
          { _id: "1", name: "test1" },
          { _id: "2", name: "test2" },
        ],
      });
      const result = await repository.getOne({ name: "test" }, {}, false);
      expect(result).toHaveLength(2);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("getOne error"));
      await expect(repository.getOne({ _id: "1" }, {})).rejects.toThrow("getOne error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    test("should return all records from table", async () => {
      const fakeRows = [{ _id: "1" }, { _id: "2" }];
      mockQuery.mockResolvedValueOnce({ rows: fakeRows });
      const result = await repository.getAll();
      expect(result).toEqual(fakeRows);
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM "test_table"');
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("getAll error"));
      await expect(repository.getAll()).rejects.toThrow("getAll error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("getPaginate", () => {
    test("should return paginated results", async () => {
      // getTableFields
      mockQuery.mockResolvedValueOnce({
        rows: [{ column_name: "_id" }, { column_name: "name" }],
      });
      // actual query
      mockQuery.mockResolvedValueOnce({
        rows: [{ _id: "1", name: "test" }],
      });
      const result = await repository.getPaginate(
        1,
        { name: "test" },
        { createdAt: -1 },
        10,
        {}
      );
      expect(result).toEqual([{ _id: "1", name: "test" }]);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should handle null fields with IS NULL", async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ column_name: "_id" }],
      });
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await repository.getPaginate(
        1,
        { deletedAt: "null" },
        { createdAt: -1 },
        10,
        {}
      );
      const queryText = mockQuery.mock.calls[1][0];
      expect(queryText).toContain("IS NULL");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should handle date fields with initDate", async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ column_name: "_id" }],
      });
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await repository.getPaginate(
        1,
        { initDate: "2024-01-01" },
        { createdAt: -1 },
        10,
        {}
      );
      const queryText = mockQuery.mock.calls[1][0];
      expect(queryText).toContain(">");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should handle date fields with endDate", async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ column_name: "_id" }],
      });
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await repository.getPaginate(
        1,
        { endDate: "2024-12-31" },
        { createdAt: -1 },
        10,
        {}
      );
      const queryText = mockQuery.mock.calls[1][0];
      expect(queryText).toContain("<");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("paginate error"));
      await expect(
        repository.getPaginate(1, {}, { createdAt: -1 }, 10, {})
      ).rejects.toThrow("paginate error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("getCount", () => {
    test("should return count of matching records", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ count: "5" }] });
      const result = await repository.getCount({ active: true });
      expect(result).toBe("5");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should handle null filter values", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ count: "0" }] });
      await repository.getCount({ deletedAt: "null" });
      const queryText = mockQuery.mock.calls[0][0];
      expect(queryText).toContain("IS NULL");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should handle date filters in getCount", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ count: "3" }] });
      await repository.getCount({ initDate: "2024-01-01" });
      const queryText = mockQuery.mock.calls[0][0];
      expect(queryText).toContain(">");
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("count error"));
      await expect(repository.getCount({ active: true })).rejects.toThrow("count error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });

  describe("aggregate", () => {
    test("should execute raw query and return rows", async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ total: 100 }],
      });
      const result = await repository.aggregate({
        text: "SELECT COUNT(*) as total FROM users",
        values: [],
      });
      expect(result).toEqual([{ total: 100 }]);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should strip backslashes from query text", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await repository.aggregate({
        text: "SELECT * FROM \\'users\\'",
        values: [],
      });
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM 'users'", []);
      expect(mockRelease).toHaveBeenCalled();
    });

    test("should release client even on error", async () => {
      mockQuery.mockRejectedValueOnce(new Error("aggregate error"));
      await expect(
        repository.aggregate({ text: "SELECT 1", values: [] })
      ).rejects.toThrow("aggregate error");
      expect(mockRelease).toHaveBeenCalled();
    });
  });
});
