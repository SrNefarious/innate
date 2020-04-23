var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  requirement: { type: Schema.Types.ObjectId, ref: "Jobrequirement" },
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
