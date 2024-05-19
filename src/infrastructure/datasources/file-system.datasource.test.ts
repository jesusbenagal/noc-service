import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDataSource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toHaveLength(3);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "test",
    });

    logDatasource.saveLog(log);

    const logs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(logs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-medium.log", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test",
      origin: "test",
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high.log", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test",
      origin: "test",
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDataSource = new FileSystemDatasource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "test",
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test",
      origin: "test",
    });
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test",
      origin: "test",
    });

    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });
});
