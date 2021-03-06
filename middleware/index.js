//all middleware
var Recipe = require("../models/recipe");
var Comment = require("../models/comment");
var User = require("../models/user");

var middlewareObj = {};

middlewareObj.checkRecipeOwnership = function(req, res, next){
	if(req.isAuthenticated()){
			Recipe.findById(req.params.id, function(err, foundRecipe){
			if(err){
				res.redirect("back");
			} else {
				//does user own the recipe?
				if(foundRecipe){
					next();
				} else {
					res.redirect("back");
				}
				}
			});
		} else {
			res.redirect("back");
		}
	}


middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			//does user own the comment?
			if(foundComment.author.id.equals(req.user._id)){
				next();
			} else {
				res.redirect("back");
			}
			}
		});
	} else {
		res.redirect("back");
	}
}


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj