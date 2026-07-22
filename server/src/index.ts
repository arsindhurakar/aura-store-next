import { logger } from "@/logger/index.js";
import app from "./app.js";
import { config } from "./config/index.js";

const PORT = config.port ?? 3000;

app.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
      env: process.env.NODE_ENV,
    },
    "Server started",
  );
});
