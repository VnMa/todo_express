var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", userController.user_list);

router.post("/ping", function(req, res) {
  //   res.send("pong");
  console.log("req.body: ", req.body);

  res.json({ ...req.body, success: "ok" });
});

router.post("/test_form", function(req, res) {
    //   res.send("pong");
    console.log("req.body: ", req.body);
  
    res.json({ ...req.body, success: "ok" });
  });

module.exports = router;
