var Validator = require("validator");
var isEmpty = require("./is-empty");
var User = require("../models/user");
function PhoneValidator(number) {
  var n = /^\d{10}$/;
  if (number.match(n)) {
    return true;
  } else {
    return false;
  }
}
module.exports = (req, res, next) => {
  let errors = {};
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.phone = !isEmpty(req.body.phone) ? req.body.phone : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (!Validator.isLength(req.body.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }
  if (!PhoneValidator(req.body.phone)) {
    errors.phone = "Phone Number Not valid";
  }
  if (Validator.isEmpty(req.body.phone)) {
    errors.phone = "Phone number field required";
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
    User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    })
      .then((existinguser) => {
        if (existinguser) {
          if (existinguser.email == req.body.email) {
            errors.email = "Email already registered";
            res.status(400).json({
              message: "An error occurred when saving database",
              errors: errors,
            });
          }
          if (existinguser.phone == req.body.phone) {
            errors.phone = "Phone already registered";
            res.status(400).json({
              message: "An error occurred when saving database",
              errors: errors,
            });
          }
        } else {
          if (!isEmpty(errors)) {
            res.status(400).json({
              message: "An error occurred when saving database",
              errors: errors,
            });
          } else {
            return next();
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ message: "We are Facing Technical Error", err: err });
      });
  }
};
