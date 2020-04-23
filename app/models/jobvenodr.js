var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobVendorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  intrest: [
    {
      industry: { type: Schema.Types.ObjectId, ref: "Industry" },
    },
  ],
  location: String,
});

module.exports = mongoose.model("Jobvendor", JobVendorSchema);
