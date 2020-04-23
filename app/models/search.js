var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  search: { type: String },
});

module.exports = mongoose.model("Search", SearchSchema);
