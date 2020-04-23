var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email_verify: { code: String, date: Date },
    phone: { type: Number, required: true, unique: true, trim: true },
    phone_verify: { code: String, date: Date },
    password: { type: String },
    profile_verified: { type: Boolean, default: false },
    verified: {
      email: { type: Boolean, default: false },
      phone: { type: Boolean, default: false },
      innate: { type: Boolean, default: false },
    },
    last_login: {
      type: Date,
    },
    last_email_sent: {
      subject: { type: String },
      message: { type: String },
      date: Date,
    },
    notification: {
      email: { type: Boolean, default: true },
      phone: { type: Boolean, default: true },
    },
    role: {
      type: Number,
      default: 0, // Use Const Folder for Role
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);
UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//password check
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
