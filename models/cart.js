var mongoose = require("mongoose");
var User = require("../models/user");
var Product = require("../models/product");
var {Schema} = mongoose;
const CartSchema = new Schema({
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
		{type: mongoose.Schema.Types.ObjectId,
      	 ref: "Product"}
	],

    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);