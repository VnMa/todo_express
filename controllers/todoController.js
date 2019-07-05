const User = require("../models/user");
const async = require("async");
const Todo = require("../models/todo");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.todo_list = function(req, res, next) {
  Todo.find().exec(function(err, todos) {
    if (err) {
      return next(err);
    }

    res.render("todo_list", {
      title: "Todo list",
      todos: todos
    });
  });
};

exports.todo_form = function(req, res, next) {
  res.render("todo_form", { title: "Create Todo" });
};

exports.todo_create = [
  // Validate fields
  body("title", "todo title is required")
    .isLength({ min: 1 })
    .trim(),

  //   body("content")
  //     .isLength({ min: 1 })
  //     .trim()
  //     .withMessage("Content should not be blank"),

  // Sanitize fields
  sanitizeBody("title").escape(),
  sanitizeBody("content").escape(),
  function(req, res, next) {
    console.log("req: ", req.body);
    const errors = validationResult(req);
    console.log("errors: ", errors);

    if (!errors.isEmpty()) {
      res.render("todo_form", {
        title: "Create Todo",
        errors: errors.array()
      });
    } else {
      const { title, content } = req.body;
      const todo = new Todo({
        title,
        content
      });

      todo.save(function(err) {
        if (err) {
          return next(err);
        }

        // Redirect to todo list
        res.redirect("/todo_list");
      });
    }
  }
];

exports.todo_show = [
  // Validate fields
  body("title", "todo title is required")
    .isLength({ min: 1 })
    .trim(),

  function(req, res, next) {
    const errors = validationResult(req);

    res.json({ ...req.body, okay: "kakaka okala xxxx" });
  }
];
