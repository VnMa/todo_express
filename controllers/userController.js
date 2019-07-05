const User = require("../models/user");
const async = require("async");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.user_list = function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) {
      return next(err);
    }

    res.render("user_list", {
      title: "User list",
      users
    });
  });
};
