var express = require("express");
var router = express.Router();
var passport = require("passport");
var Auth = require("../../config/passport");
var { jobgiver } = require("./controller");
var Validator = require("../../validation");

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});
router.get("/signup", jobgiver.register_render);
router.post("/signup", Validator.signup, jobgiver.register);
router.get("/signin", jobgiver.login_render);
router.post(
  "/signin",
  Validator.signin,
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/logout", function (req, res, next) {
  req.logOut();
  res.redirect("/");
});
router.get("/profile", Auth.isAuthenticated, jobgiver.profile_render);

router.get("/dashboard", Auth.isAuthenticated, jobgiver.dashboard_render);

router.get(
  "/create-requirement",
  Auth.isAuthenticated,
  jobgiver.create_requirement_render
);
router.post(
  "/create-requirement",
  Auth.isAuthenticated,
  Validator.create_requirement,
  jobgiver.create_requirement
);

router.get("/candidates/:requirement", Validator.mongo, jobgiver.candidates);

module.exports = router;
