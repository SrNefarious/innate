var express = require("express");
var router = express.Router();
var passport = require("passport");
var { jobvendor } = require("./controller");
var Validator = require("../../validation");
var Auth = require("../../config/passport");

router.get("/", (req, res) => {
  res.redirect("/jobvendor/explore");
});

router.get("/signup", jobvendor.register_render);
router.post("/signup", Validator.signup, jobvendor.register);

router.get("/signin", jobvendor.login_render);
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
router.get("/explore", Auth.isAuthenticated, jobvendor.dashboard_render);

router.get("*", (req, res) => {
  res.send("page not found");
});

module.exports = router;
