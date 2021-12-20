var mongoose = require("mongoose");
var User = require("../models/user");
var {Schema} = mongoose;
const ProductSchema = new Schema({
 
	productId: {
      	type: mongoose.Schema.Types.ObjectId,
      	ref: "Recipe"
	},
    
    quantity: Number,
	
	total: {
      type: Number,
      required: true,
   	},
  },
  	{
    timestamps: true,
  	}
);

module.exports = mongoose.model("Product", ProductSchema);