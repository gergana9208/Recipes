var mongoose = require("mongoose");
var User = require("../models/user");
var Recipe = require("../models/recipe");

var {Schema} = mongoose;
var farmSchema = new Schema({
	name: String,
	recipes: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Recipe"
		}
	]

	
	
	});

module.exports = mongoose.model("Farm", farmSchema);
