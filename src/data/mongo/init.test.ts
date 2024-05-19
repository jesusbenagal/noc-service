import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("init MongoDB", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test("should init MongoDB", async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  });

  test("should throw error", async () => {
    try {
      await MongoDatabase.connect({
        dbName: "wrong",
        mongoUrl: "wrong",
      });
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
