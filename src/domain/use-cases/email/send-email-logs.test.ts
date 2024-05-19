import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("SendEmailLogs UseCase", () => {
  const emailServiceMock = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const logRepositoryMock: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    emailServiceMock as any,
    logRepositoryMock
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send an email with logs", async () => {
    const result = await sendEmailLogs.execute("correo@correo.com");

    expect(result).toBe(true);

    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      "correo@correo.com"
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("should log in case of error", async () => {
    emailServiceMock.sendEmailWithFileSystemLogs.mockReturnValue(false);

    const result = await sendEmailLogs.execute("correo@correo.com");

    expect(result).toBe(false);

    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      "correo@correo.com"
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledTimes(1);
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
