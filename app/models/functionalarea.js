var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FunctionalAreaSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Functionalarea", FunctionalAreaSchema);
