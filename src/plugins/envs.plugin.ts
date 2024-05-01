import "dotenv/config";
import * as env from "env-var";

export const envs = {
  SENDER_MAILER: env.get("SENDER_MAILER").required().asEmailString(),
  SECRET_KEY_MAILER: env.get("SECRET_KEY_MAILER").required().asString(),
  SERVICE_MAILER: env.get("SERVICE_MAILER").required().asString(),
};
