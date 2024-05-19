import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
  const dataObj = {
    message: "Test Log",
    level: LogSeverityLevel.low,
    origin: "log.datasource.test.ts",
  };

  test("should create a LogEntity Instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a log instance from a JSON string", () => {
    const json = `{"message":"Test","level":"high","createdAt":"2024-04-28T15:56:15.592Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Test");
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should return an empty log instance when the JSON string is empty", () => {
    const log = LogEntity.fromJson("");

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(undefined);
    expect(log.level).toBe(undefined);
    expect(log.origin).toBe(undefined);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a log instance from an object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
