const express = require("express");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:statup");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
debug("Application Name: " + config.get("name"));
debug("Mail Server: " + config.get("mail.host"));
debug("password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Mongan enabled...");
}

const port = process.env.PORT || 3000;

app.listen(port, () => debug(`listening on port ${port}...`));
