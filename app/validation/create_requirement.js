var Validator = require("validator");
var isEmpty = require("./is-empty");

module.exports = (req, res, next) => {
  let errors = {};
  req.body.profile = !isEmpty(req.body.profile) ? req.body.profile : "";
  req.body.address = !isEmpty(req.body.address) ? req.body.address : "";
  req.body.jobdescription = !isEmpty(req.body.jobdescription)
    ? req.body.jobdescription
    : "";
  req.body.industry = !isEmpty(req.body.industry) ? req.body.industry : "";
  req.body.area = !isEmpty(req.body.area) ? req.body.area : "";
  req.body.requirements = Number(req.body.requirements);
  req.body.minctc = Number(req.body.minctc);
  req.body.maxctc = Number(req.body.maxctc);

  if (Validator.isEmpty(req.body.profile)) {
    errors.profile = "profile field is required";
  }
  if (Validator.isEmpty(req.body.address)) {
    errors.address = "city field is required";
  }
  if (req.body.requirements <= 0) {
    errors.requirements = "requirements must greater than 0";
  }
  if (isEmpty(req.body.requirements)) {
    errors.requirements = "requirements field is required";
  }
  if (req.body.minctc <= 0) {
    errors.minctc = "minctc must greater than 0";
  }
  if (isEmpty(req.body.minctc)) {
    errors.minctc = "minctc field is required";
  }
  if (req.body.maxctc <= 0) {
    errors.maxctc = "maxctc must greater than 0";
  }
  if (isEmpty(req.body.maxctc)) {
    errors.maxctc = "maxctc field is required";
  }
  if (Validator.isEmpty(req.body.jobdescription)) {
    errors.jobdescription = "jobdescription field is required";
  }

  if (!Validator.isMongoId(req.body.industry)) {
    errors.industry = "Not a valid industry";
  }
  if (Validator.isEmpty(req.body.industry)) {
    errors.industry = "Industry field is required";
  }
  if (!Validator.isMongoId(req.body.functional_area)) {
    errors.functional_area = "Not a valid functional_area";
  }
  if (Validator.isEmpty(req.body.functional_area)) {
    errors.functional_area = "functional_area field is required";
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
