var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobRequirementStatusSchema = new Schema(
  {
    alloted_bp_count: { type: Number, default: 0 },
    view_count: { type: Number, default: 0 },
    viewed: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        date: Date,
      },
    ],
    bookmark_count: { type: Number, default: 0 },
    bookmarked: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        date: Date,
      },
    ],
    cv_upload_count: { type: Number, default: 0 },
    cv: { type: Schema.Types.ObjectId, ref: "Cv" },
    bot_screening_count: { type: Number, default: 0 },
    bot_screening_pass: { type: Number, default: 0 },
    innate_screening_count: { type: Number, default: 0 },
    innate_screening_pass: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model(
  "Jobrequirementstatus",
  JobRequirementStatusSchema
);
