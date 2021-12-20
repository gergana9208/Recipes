var mongoose = require("mongoose");
var User = require("../models/user");
var {Schema} = mongoose;
var itemSchema = new Schema({
	title: String,
	val: String
});

module.exports = mongoose.model("Item", itemSchema);
