const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const { middlewareError } = require("./middlewares/errors.js");
const { NotFoundError } = require("./errors/customErrors");

require("./db.js");

const server = express();
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((req, res, next) => {
  const error = new NotFoundError("Not Found");
  next(error);
});

server.use(middlewareError);

module.exports = server;
