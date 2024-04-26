import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log("Service is OK!"),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute("https://www.google.com");
    });
  }
}
