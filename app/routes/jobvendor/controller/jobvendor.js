exports.register_render = (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("jobvendor/signup");
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
    userDetails.role = 2;
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
    res.render("jobvendor/signin");
  }
};
exports.dashboard_render = (req, res) => {
  res.send("Dashboard");
};
