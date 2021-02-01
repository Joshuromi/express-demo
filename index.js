const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) res.status(404).send("The course with this id was not found.");
  else res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));