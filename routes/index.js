var express = require("express");
var router = express.Router();

var urlencodedParser = express.urlencoded();

var todo_controller = require("../controllers/todoController");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Sign up" });
});

router.get("/todo_list", todo_controller.todo_list);

router.get("/todo/create", todo_controller.todo_form);
router.post("/todo/create", urlencodedParser, todo_controller.todo_create);

module.exports = router;
