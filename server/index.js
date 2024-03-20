const { startDB } = require("./db");
const express = require("express");
const cors = require("cors");
const config = require("./assets/config");
const router = require("./routers");
const ErrorHandlerMiddleware = require("./middleware/ErrorHandlerMiddleware");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const { PORT, CLIENT_HOST, CLIENT_PORT, CLIENT_PROTOCOL } = config;

function appStartedCallback() {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
}

const startServer = async () => {
  const app = express();

  try {
    await startDB();

    app.use(
      cors({
        credentials: true,
        origin: [
          `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
          `${CLIENT_PROTOCOL}://localhost`,
        ],
      })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use("/api", router);
    app.use(fileUpload({}));
    app.use(ErrorHandlerMiddleware);
    app.use("/static", express.static("static"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var accessLogStream = fs.createWriteStream(
      path.join(__dirname, "logger.log"),
      { flags: "a" }
    );

    app.use(morgan("combined", { stream: accessLogStream }));
    app.listen(PORT, appStartedCallback);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

startServer();

module.exports = startServer;
