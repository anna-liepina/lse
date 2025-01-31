import dotenv from "dotenv";
import { existsSync } from "fs";

dotenv.config();

export const validateEnv = () => {
  if (!process.env.PORT) {
    throw new Error("PORT environment variable is missing");
  }

  if (process.env.SSL_KEY && !existsSync(process.env.SSL_KEY)) {
    throw new Error(`SSL_KEY file does not exist at ${process.env.SSL_KEY}`);
  }

  if (process.env.SSL_CERT && !existsSync(process.env.SSL_CERT)) {
    throw new Error(`SSL_CERT file does not exist at ${process.env.SSL_CERT}`);
  }
};
