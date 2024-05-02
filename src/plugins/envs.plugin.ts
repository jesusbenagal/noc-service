import "dotenv/config";
import * as env from "env-var";

export const envs = {
  SENDER_MAILER: env.get("SENDER_MAILER").required().asEmailString(),
  SECRET_KEY_MAILER: env.get("SECRET_KEY_MAILER").required().asString(),
  SERVICE_MAILER: env.get("SERVICE_MAILER").required().asString(),

  // Mongo DB
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
};
