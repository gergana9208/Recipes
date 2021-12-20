var express = require("express");
var router = express.Router({mergeParams: true});
var Recipe = require("../models/recipe");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	//find recipes by id
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			console.log(recipe);
		} else {
			res.render("comments/new", {recipe: recipe});
		}
	});
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup recipe using id
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					recipe.comments.push(comment);
					recipe.save();
					res.redirect('/recipes/' + recipe._id);
				}
			});
		}
	});
});

//Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
		res.redirect("back");	
	} else {
	res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
	}
});
});

//Comment Update 
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/recipes/" + req.params.id );
		}
	});
});

//Comment DEstroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
Comment.findByIdAndRemove(req.params.comment_id, function(err){
	if(err){
		res.redirect("back");
	} else {
		res.redirect("/recipes/" + req.params.id)
	}
});
});


module.exports = router;