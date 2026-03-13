import { describe, test, expect, beforeEach, jest, mock } from "bun:test";
const mockCollection = jest.fn();
const mockDb = jest.fn(() => ({
  collection: mockCollection,
}));
const mockClose = jest.fn();
const mockConnect = jest.fn();
const mockStartSession = jest.fn();
const mockEndSession = jest.fn();

mock.module("mongodb", () => ({
  MongoClient: {
    connect: jest.fn().mockResolvedValue({
      db: mockDb,
      close: mockClose,
      connect: mockConnect,
      startSession: mockStartSession.mockResolvedValue({
        endSession: mockEndSession,
      }),
    }),
  },
  Collection: jest.fn(),
}));

import { MongoHelper } from "./mongodb-helper";

describe("MongoHelper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset internal state
    MongoHelper.client = null;
    MongoHelper.uri = null as unknown as string;
    MongoHelper.session = null;
  });

  describe("connect", () => {
    test("should connect to MongoDB with the provided URI", async () => {
      const { MongoClient } = require("mongodb");
      await MongoHelper.connect("mongodb://localhost:27017");
      expect(MongoClient.connect).toHaveBeenCalledWith("mongodb://localhost:27017", {
        retryReads: true,
        retryWrites: true,
      });
      expect(MongoHelper.uri).toBe("mongodb://localhost:27017");
      expect(MongoHelper.client).toBeTruthy();
    });

    test("should store the uri for reconnection", async () => {
      await MongoHelper.connect("mongodb://localhost:27017/testdb");
      expect(MongoHelper.uri).toBe("mongodb://localhost:27017/testdb");
    });
  });

  describe("disconnect", () => {
    test("should close client and set it to null", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      await MongoHelper.disconnect();
      expect(mockClose).toHaveBeenCalledTimes(1);
      expect(MongoHelper.client).toBeNull();
    });

    test("should do nothing if client is already null", async () => {
      MongoHelper.client = null;
      await MongoHelper.disconnect();
      expect(mockClose).not.toHaveBeenCalled();
    });

    test("should end session before closing", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      // Start a session so endSession has something to end
      await MongoHelper.startSession();
      await MongoHelper.disconnect();
      expect(mockEndSession).toHaveBeenCalled();
      expect(mockClose).toHaveBeenCalled();
      expect(MongoHelper.client).toBeNull();
    });
  });

  describe("getCollection", () => {
    test("should return a collection by name", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      mockCollection.mockReturnValue("fakeCollection");
      const collection = await MongoHelper.getCollection("users");
      expect(mockDb).toHaveBeenCalled();
      expect(mockCollection).toHaveBeenCalledWith("users");
      expect(collection).toBe("fakeCollection");
    });

    test("should reconnect if client is null", async () => {
      const { MongoClient } = require("mongodb");
      MongoHelper.uri = "mongodb://localhost:27017";
      MongoHelper.client = null;
      mockCollection.mockReturnValue("fakeCollection");
      await MongoHelper.getCollection("users");
      expect(MongoClient.connect).toHaveBeenCalledWith("mongodb://localhost:27017", {
        retryReads: true,
        retryWrites: true,
      });
    });
  });

  describe("mapPassword", () => {
    test("should set password to null in collection object", () => {
      const result = MongoHelper.mapPassword({
        _id: "123",
        name: "test",
        password: "secret",
      });
      expect(result).toEqual({
        _id: "123",
        name: "test",
        password: null,
      });
    });

    test("should handle objects without password", () => {
      const result = MongoHelper.mapPassword({ _id: "123", name: "test" });
      expect(result).toEqual({ _id: "123", name: "test", password: null });
    });
  });

  describe("mapCollectionPassword", () => {
    test("should map password to null for all items in collection", () => {
      const result = MongoHelper.mapCollectionPassword([
        { _id: "1", password: "abc" },
        { _id: "2", password: "def" },
      ]);
      expect(result).toEqual([
        { _id: "1", password: null },
        { _id: "2", password: null },
      ]);
    });

    test("should return empty array for empty input", () => {
      const result = MongoHelper.mapCollectionPassword([]);
      expect(result).toEqual([]);
    });
  });

  describe("session lifecycle", () => {
    test("startSession should create and store a session", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      const session = await MongoHelper.startSession();
      expect(session).toBeTruthy();
      expect(MongoHelper.session).toBe(session);
    });

    test("getSession should return the current session", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      await MongoHelper.startSession();
      const session = await MongoHelper.getSession();
      expect(session).toBeTruthy();
    });

    test("getSession should return null when no session is started", async () => {
      MongoHelper.session = null;
      const session = await MongoHelper.getSession();
      expect(session).toBeNull();
    });

    test("endSession should end the session and set it to null", async () => {
      await MongoHelper.connect("mongodb://localhost:27017");
      await MongoHelper.startSession();
      await MongoHelper.endSession();
      expect(mockEndSession).toHaveBeenCalled();
      expect(MongoHelper.session).toBeNull();
    });

    test("endSession should do nothing if no session exists", async () => {
      MongoHelper.session = null;
      await MongoHelper.endSession();
      expect(MongoHelper.session).toBeNull();
    });
  });
});
