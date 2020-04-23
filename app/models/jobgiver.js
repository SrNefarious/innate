var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobGiverSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  avatar: { type: String },
  address: { type: String },
  about: { type: String },
  gender: { type: Number }, // Use Const Folder for Gender
  //   Create a New Company Schema or link
  company: {
    employees: { type: Number }, //Use Const folder for Company
    department: { type: Number }, //Use Const folder for Company
    designation: { type: Number }, //Use Const folder for Company
    pan: { type: String },
    gst: { type: String },
    cin: { type: String },
    verified: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Jobgiver", JobGiverSchema);
