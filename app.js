var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var _ = require('lodash'); //lodash 
var clone = require('lodash.clone');
var Recipe = require("./models/recipe");
var Comment = require("./models/comment");
var User = require("./models/user");
var Farm = require("./models/farm");
var Cart = require("./models/cart");
var Product = require("./models/product");
var seedDB = require("./seeds");
seedDB();

//Requiring Routes
var commentRoutes = require("./routes/comments");
var recipeRoutes = require("./routes/recipes");
var indexRoutes = require("./routes/index");
var farmRoutes = require("./routes/farms");
//Load  Lodash method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

mongoose.connect("mongodb://localhost:27017/recipes11", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static (__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); //seeding the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments",commentRoutes);
app.use("/farms", farmRoutes);





app.listen(3000, () => {
	console.log('No errors u la la!');
});