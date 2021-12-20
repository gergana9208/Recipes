var mongoose = require("mongoose");
var User = require("../models/user");
var {Schema} = mongoose;
var ingredientSchema = new Schema({
    name: { type: String, required: true },
  
});

module.exports = mongoose.model("Ingredient", ingredientSchema);