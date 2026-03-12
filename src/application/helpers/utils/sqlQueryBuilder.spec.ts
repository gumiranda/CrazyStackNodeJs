import { SQLQueryBuilder } from "./sqlQueryBuilder";

describe("SQLQueryBuilder", () => {
  let sut: SQLQueryBuilder;
  beforeEach(() => {
    sut = new SQLQueryBuilder("users");
  });
  it("should store tableName", () => {
    expect(sut.tableName).toBe("users");
  });
  it("should build empty query", () => {
    const result = sut.build();
    expect(result).toEqual({ text: "", values: [] });
  });
  describe("match", () => {
    it("should add WHERE clause", () => {
      const result = sut.match('"active" = true').build();
      expect(result.text).toBe('WHERE "active" = true');
    });
  });
  describe("sort", () => {
    it("should add ORDER BY ASC", () => {
      const result = sut.sort({ name: 1 }).build();
      expect(result.text).toBe('ORDER BY "name" ASC');
    });
    it("should add ORDER BY DESC", () => {
      const result = sut.sort({ createdAt: -1 }).build();
      expect(result.text).toBe('ORDER BY "createdAt" DESC');
    });
    it("should handle multiple sort fields", () => {
      const result = sut.sort({ name: 1, createdAt: -1 }).build();
      expect(result.text).toBe('ORDER BY "name" ASC, "createdAt" DESC');
    });
  });
  describe("sortByDistance", () => {
    it("should add distance-based ORDER BY and push values", () => {
      const result = sut.sortByDistance(-46.69, -23.56).build();
      expect(result.text).toContain("ORDER BY");
      expect(result.text).toContain("ST_DistanceSphere");
      expect(result.text).toContain("users.coord");
      expect(result.values).toEqual([-46.69, -23.56]);
    });
  });
  describe("join", () => {
    it("should add JOIN clause", () => {
      const result = sut.join({ table: "orders", on: '"users"."id" = "orders"."userId"' }).build();
      expect(result.text).toBe('JOIN "orders" ON "users"."id" = "orders"."userId"');
    });
  });
  describe("project", () => {
    it("should add SELECT FROM clause", () => {
      const result = sut.project("*").build();
      expect(result.text).toBe('SELECT * FROM "users"');
    });
    it("should add SELECT with specific fields", () => {
      const result = sut.project('"name", "email"').build();
      expect(result.text).toBe('SELECT "name", "email" FROM "users"');
    });
  });
  describe("projectWithDistance", () => {
    it("should add SELECT with distance calculation and push values", () => {
      const result = sut.projectWithDistance(-46.69, -23.56).build();
      expect(result.text).toContain("SELECT users.*");
      expect(result.text).toContain("ST_DistanceSphere");
      expect(result.text).toContain("AS distance");
      expect(result.text).toContain('FROM "users"');
      expect(result.values).toEqual([-46.69, -23.56]);
    });
  });
  describe("projectSubQuery", () => {
    it("should add SELECT FROM subquery", () => {
      const result = sut.projectSubQuery("*", "SELECT * FROM orders", "sub").build();
      expect(result.text).toBe("SELECT * FROM (SELECT * FROM orders) as sub");
    });
  });
  describe("group", () => {
    it("should add GROUP BY clause", () => {
      const result = sut.group({ _id: '"status"' }).build();
      expect(result.text).toBe('GROUP BY "status"');
    });
    it("should add HAVING clause when total is provided", () => {
      const result = sut.group({ _id: '"status"', total: 5 }).build();
      expect(result.text).toBe('GROUP BY "status" HAVING COUNT(*) > 5');
    });
    it("should not add HAVING clause when total is falsy", () => {
      const result = sut.group({ _id: '"status"', total: 0 }).build();
      expect(result.text).toBe('GROUP BY "status"');
    });
  });
  describe("addValue", () => {
    it("should push value to values array", () => {
      sut.addValue("test");
      sut.addValue(42);
      sut.addValue(true);
      expect(sut.values).toEqual(["test", 42, true]);
    });
    it("should return builder for chaining", () => {
      expect(sut.addValue("test")).toBe(sut);
    });
  });
  describe("skip", () => {
    it("should add OFFSET clause", () => {
      const result = sut.skip(10).build();
      expect(result.text).toBe("OFFSET 10");
    });
  });
  describe("limit", () => {
    it("should add LIMIT clause", () => {
      const result = sut.limit(20).build();
      expect(result.text).toBe("LIMIT 20");
    });
  });
  describe("chaining", () => {
    it("should chain multiple operations", () => {
      const result = sut
        .project("*")
        .match('"active" = true')
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(10)
        .build();
      expect(result.text).toBe(
        'SELECT * FROM "users" WHERE "active" = true ORDER BY "createdAt" DESC OFFSET 0 LIMIT 10'
      );
      expect(result.values).toEqual([]);
    });
    it("should chain with values", () => {
      const result = sut
        .project("*")
        .match('"name" = $1')
        .addValue("John")
        .sort({ name: 1 })
        .build();
      expect(result.values).toEqual(["John"]);
    });
    it("should support fluent interface", () => {
      expect(sut.match("")).toBe(sut);
      expect(sut.sort({})).toBe(sut);
      expect(sut.join({ table: "t", on: "1=1" })).toBe(sut);
      expect(sut.project("*")).toBe(sut);
      expect(sut.skip(0)).toBe(sut);
      expect(sut.limit(1)).toBe(sut);
      expect(sut.addValue("v")).toBe(sut);
    });
  });
});
