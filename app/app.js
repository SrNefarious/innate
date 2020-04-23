require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
var engine = require("ejs-mate");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var helmet = require("helmet");
var compression = require("compression");
var { hostRedirect } = require("./misc");
var User = require("./models/user");
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
var app = express();

app.use(
  compression({
    filter: function (req, res) {
      return true;
    },
  })
);
var oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
app.use(express.static(__dirname + "/public", { maxAge: oneYear }));
app.set("trust proxy", true);
app.use(hostRedirect);

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRETKEY,
    store: new MongoStore({ url: process.env.DATABASE, autoReconnect: true }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.engine("ejs", engine);

app.set("view engine", "ejs");
// if (process.env.production) {
//   app.set("view cache", true);
// } else {
//   app.set("view cache", false);
// }

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/jobgiver", require("./routes").jobGiver);
app.use("/jobvendor", require("./routes").jobVendor);
module.exports = app;
