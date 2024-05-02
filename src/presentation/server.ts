import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import {
  FileSystemDatasource,
  LogRepositoryImpl,
  MongoLogDatasource,
  PostgresLogDatasource,
} from "../infrastructure";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   "jesusbenagal95@gmail.com"
    // );

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log("Service is OK!"),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute(url);
    });
  }
}
