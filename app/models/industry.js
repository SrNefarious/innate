var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IndustrySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Industry", IndustrySchema);
