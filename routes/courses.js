const Joi = require("joi");
const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

// get all courses
router.get("/", (req, res) => {
  res.send(courses);
});

// get one course
router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    return res.status(404).send("The course with this id was not found.");
  }
  res.send(course);
});

// add new course
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// update course
router.put("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    return res.status(404).send("The course with this id was not found.");
  }
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  course.name = req.body.name;
  res.send(course);
});

// delete a course
router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    return res.status(404).send("The course with this id was not found.");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(course);
}

module.exports = router;
