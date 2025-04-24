import app from "./app.js";
import cluster from "cluster";
import { cpus } from "os";
import dotenv from "dotenv";
import color from "colors";
import config from "./config/configuration.js";
import logger from "./config/logger.js";

dotenv.config();
color.setTheme({
  info: "green",
  warn: "yellow",
  db: "yellow",
  error: "red",
  debug: "blue",
  connected: "cyan",
});

const port = config.port;
export const initApp = async () => {
  try {
    app.listen(port, async () => {
      logger.info(`Listening to the port - ${port}`);
      return "The Server is up and running";
    });
  } catch (error) {
    return console.log("Unable to connect - ", error);
  }
};

if (config.env === "production") {
  if (cluster.isPrimary) {
    const cpuCount = cpus().length;
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  } else {
    initApp();
    cluster.addListener(`listening`, () => {
      logger.info(
        `Worker ${cluster.worker?.id} is now connected to the server`
      );
    });
  }
} else {
  initApp();
}
