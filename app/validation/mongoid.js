var Validator = require("validator");
var isEmpty = require("./is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.params.requirement = !isEmpty(req.params.requirement)
    ? req.params.requirement
    : "";
  if (!Validator.isMongoId(req.params.requirement)) {
    errors.mongo = "Not a valid url";
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    next();
  }
};
