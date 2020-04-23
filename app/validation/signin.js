var Validator = require("validator");
var isEmpty = require("./is-empty");
var User = require("../models/user");

module.exports = (req, res, next) => {
  let errors = {};
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    return next();
  }
};
