var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobCvSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  aadhar: { type: String, required: true },
  cv: { type: String },
  cv_image: { type: String },
  requierment: { type: Schema.Types.ObjectId, ref: "Jobrequirement" },
  vendor: { type: Schema.Types.ObjectId, ref: "Jobvendor" },
  showrefferee: { type: Boolean, default: false },
  selected: { type: Boolean },
  job_accepted: { type: Boolean },
  job_ctc: { type: Number },
  job_joining: { type: Date },
  status: { type: Number, default: 0 },
  interview: [
    {
      feedback: String,
      date: Date,
    },
  ],
  botscreening: { type: Boolean, default: 0 },
  innatescreening: { type: Boolean, default: 0 },
});

module.exports = mongoose.model("Cv", JobCvSchema);
