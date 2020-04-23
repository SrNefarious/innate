var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobRequirementSchema = new Schema(
  {
    profile: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    requirements: { type: Number, required: true },
    minctc: { type: Number, required: true },
    maxctc: { type: Number, required: true },
    jobdescription: { type: String, required: true },
    workexperience: { type: Number },
    industry: { type: Schema.Types.ObjectId, ref: "Industry", required: true },
    functional_area: {
      type: Schema.Types.ObjectId,
      ref: "Functionalarea",
      required: true,
    },
    keywords: [String],
    question: [
      {
        question: {
          type: String,
        },
      },
    ],
    recivenotification: { type: Boolean, default: true },
    commission: { type: Number },
    verified: { type: Boolean, default: false },
    category: { type: Number, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Jobrequirementstatus",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("Jobrequirement", JobRequirementSchema);
