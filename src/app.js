import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import config from "./config/configuration.js";
import cors from "cors";
import { successHandler, errorHandler } from "./config/morgan.js";
import mainRoutes from "./routes/main.routes.js";
import mainV2Routes from "./routes/mainv2.routes.js";
import fileUpload from "express-fileupload";

const app = express();

// If the environment is not test, use morgan for logging
if (config.env !== "test") {
  app.use(successHandler);
  app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

//enable file upload
app.use(fileUpload());

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ id: 1, message: "Welcome to the backend of Conflict.ai" });
});

// routes
app.use("/api/v1", mainRoutes);
app.use("/api/v2", mainV2Routes);

export default app;
