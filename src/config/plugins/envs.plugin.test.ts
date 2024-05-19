import { envs } from "./envs.plugin";

describe("envs.plugin", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      SENDER_MAILER: "test@gmail.com",
      SECRET_KEY_MAILER: "123123123",
      SERVICE_MAILER: "gmail",
      MONGO_URL: "mongodb://jesus:test@localhost:27017",
      MONGO_DB_NAME: "NOC_DB_TEST",
      MONGO_USER: "jesus",
      MONGO_PASS: "test",
      POSTGRES_URL: "postgresql://postgres:test@localhost:5432/NOC_DB",
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "test",
      POSTGRES_DB: "NOC_DB_TEST",
    });
  });
});
