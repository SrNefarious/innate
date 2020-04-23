var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cv: { type: Schema.Types.ObjectId, ref: "Cv", required: true },
});

module.exports = mongoose.model("Event", EventSchema);
