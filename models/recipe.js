//Schema Setup
var mongoose = require("mongoose");
var User = require("../models/user");
var {Schema} = mongoose;
var recipeSchema = new Schema({
	name: String,
	image: String,
	description: String,
	myresult: [],
	dublicate: [],
	items:[
		
	],
	author : 
		{
			id: {type: mongoose.Schema.Types.ObjectID, ref: "User"},
			username: String
		},
	
	comments: 
	[
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Comment"
		}
	],
	n: [],
	farm: 
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Farm"
		}
	
});

module.exports = mongoose.model("Recipe", recipeSchema);

