import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "test",
    });

    logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const severityLevel = LogSeverityLevel.low;

    await logRepository.getLogs(severityLevel);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
  });
});
