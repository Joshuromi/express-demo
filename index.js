const express = require("express");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:statup");
const courses = require("./routes/courses");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);

app.set("view engine", "pug");

// Configuration
debug("Application Name: " + config.get("name"));
debug("Mail Server: " + config.get("mail.host"));
debug("password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Mongan enabled...");
}

app.get("/", (req, res) => {
  res.render("index", { title: "homepage", message: "Welcome" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => debug(`listening on port ${port}...`));
