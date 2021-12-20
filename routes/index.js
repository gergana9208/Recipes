const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//Route Route
router.get("/", function(req, res){
	res.render("landing");
});

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle Sign up logic
router.post("/register", function(req, res){
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/recipes");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
		{
			successRedirect: "/farms",
			failureRedirect: "/login"
		}), function(req, res){
	});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/farms");
});

//Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;

