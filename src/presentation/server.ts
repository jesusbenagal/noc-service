import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
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
