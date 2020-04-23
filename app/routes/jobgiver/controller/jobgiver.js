var shortid = require("shortid");
var User = require("../../../models/user");
var Industry = require("../../../models/industry");
var Area = require("../../../models/functionalarea");
var JobrequirementStatus = require("../../../models/jobrequirementstatus");
var Jobrequirement = require("../../../models/jobrequirement");
var Jobcv = require("../../../models/jobcv");
exports.register_render = (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("jobgiver/signup");
  }
};

exports.register = (req, res, next) => {
  if (req.user) {
    res.redirect("/profile");
  } else {
    var userDetails = {};
    userDetails.name = req.body.name;
    userDetails.email = req.body.email;
    userDetails.phone = req.body.phone;
    userDetails.password = req.body.password;
    userDetails.email_verify = {};
    userDetails.email_verify.code = shortid.generate();
    userDetails.email_verify.date = Date.now();
    userDetails.phone_verify = {};
    userDetails.phone_verify.code = shortid.generate();
    userDetails.phone_verify.date = Date.now();
    userDetails.last_login = Date.now();
    userDetails.last_email_sent = {};
    userDetails.last_email_sent.subject = "Verify your innate account";
    userDetails.last_email_sent.message = userDetails.email_verify.code;
    userDetails.last_email_sent.date = Date.now();
    userDetails.role = 1;
    new User(userDetails).save(function (err, user) {
      if (err) return next(err);
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.redirect("/profile");
      });
      // res.json(user);
    });
  }
};

exports.login_render = (req, res, next) => {
  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("jobgiver/signin");
  }
};

exports.profile_render = (req, res) => {
  res.render("jobgiver/profile");
};
exports.dashboard_render = (req, res) => {
  Jobrequirement.find({ createdBy: req.user._id })
    .select("profile address requirements verified")
    .populate([
      {
        path: "status",
        select:
          "alloted_bp_count view_count bookmark_count cv_upload_count bot_screening_count bot_screening_pass innate_screening_count innate_screening_pass -_id",
      },
      //  { path: "createdBy" }
    ])
    .exec()
    .then((requirements) => {
      res.render("jobgiver/dashboard", { requirements: requirements });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.create_requirement_render = async (req, res) => {
  var promises = [Industry.find({}).exec(), Area.find({}).exec()];
  let [industry, area] = await Promise.all(promises);
  res.render("jobgiver/create_requirement", { industry: industry, area: area });
};
exports.create_requirement = (req, res) => {
  new JobrequirementStatus()
    .save()
    .then((data) => {
      var requirementfield = {};
      requirementfield.profile = req.body.profile;
      requirementfield.address = req.body.address;
      requirementfield.requirements = req.body.requirements;
      requirementfield.minctc = req.body.minctc;
      requirementfield.maxctc = req.body.maxctc;
      requirementfield.jobdescription = req.body.jobdescription;
      if (req.body.workexperience && req.body.workexperience > 0) {
        req.body.workexperience = Number(req.body.workexperience);
        requirementfield.workexperience = req.body.workexperience;
      }
      requirementfield.industry = req.body.industry;
      requirementfield.functional_area = req.body.functional_area;
      if (req.body.keywords) {
        requirementfield.keywords = req.body.keywords.split(",");
      }
      requirementfield.createdBy = req.user._id;
      requirementfield.status = data._id;
      new Jobrequirement(requirementfield)
        .save()
        .then((e) => {
          res.json(e);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.candidates = (req, res) => {
  var requirement = req.params.requirement;

  Jobcv.find({ requierment: requirement })
    .exec()
    .then((data) => {
      res.json(data);
    });
};
