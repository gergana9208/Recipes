var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe");
var middleware = require("../middleware");
var User = require("../models/user");
var Farm = require("../models/farm");
var Ingredient = require("../models/ingredient");


//INDEX - show all recipes
router.get("/",  function(req, res){
	//Get all recipes
Recipe.find({}, function(err, allRecipes){
		if(err){
			console.log(err);
		} else {
			
			res.render("recipes/index", {recipes: allRecipes});
		}
	});
});


////post in index

				
				
//CREATE - add new recipes to DB
router.post('/', middleware.isLoggedIn, function(req, res){
	//get all data from form and add to recipes array
	var farm = req.body.farm;
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {id: req.user._id, username: req.user.username};
	var item = {title: req.body.item.title, val: req.body.item.val};
	var items = [];
	items.push(item);
 	var it = item.title;
	var iv = item.val;
	var picked = req.body.picked;
	var myresult = [];
		for(var i=0; i<it.length; i++){
			var rez;
			for(var j=0; j<iv.length; j++){	
				rez = [it[i], "" +iv[i]];
			}
			myresult.push(rez);
		};
	var test = function (myresult) {
      localStorage[STORAGE_NAME] = JSON.stringify(myresult);
    };
	 console.log(myresult);
	var rresult = [];
	rresult.push(myresult);
	var finArr = [];
	var dublicate = req.body.dublicate;
	//////////////////
	var newArr = [];
		for(var i = 0; i < rresult.length; i++)
		{
			newArr = newArr.concat(rresult[i]);
			finArr.push(newArr);
		}
// converting newArr to 1D array in n		
	var n = [];
	for(var i = 0; i < myresult.length; i++)
	{
		n = n.concat(myresult[i]);
	}
	console.log(n);
// find duplicate element in n, work for individual recipe array
	function find_duplicate_in_array(arra1) {
			var object = {};
			var Result = [];
			arra1.forEach(function (item) {
			  if(!object[item])
				  object[item] = 0;
				object[item] += 1;
			})
			for (var prop in object) {
			   if(object[prop] >= 2) {
				   Result.push(prop);
			   }
			}
			return Result;
	}	
	dublicate = find_duplicate_in_array(n);
	console.log(find_duplicate_in_array(n));
	////////
	// how many tims is an element dublicate
	function count() {
   	n.sort();
    var current = null;
    var cnt = 0;
    for (var i = 0; i < n.length; i++) {
        if (n[i] != current) {
            if (cnt > 0) {
                console.log(current + ' comes --> ' + cnt + ' times<br>');
            }
            current = n[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
       console.log(current + ' comes --> ' + cnt + ' times');
    }
}
//make a pop up list?
//comapre myresult arrays
//find list arrays by id
//comapare all arrays
	/////////////
	var newRecipe = {name: name, image: image, ingredients: ingredients, description: desc, author: author, items:items, myresult:myresult,finArr:finArr, dublicate:dublicate, n:n, farm:farm};
	//Create a new recipe and save to DB
		Recipe.create(newRecipe, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect to recipes page

			res.redirect("/recipes");
		}
	});
	
	// selecting only myresult property from newRecipe and saving it to piceked
	//var picked = (({myresult }) => ({ myresult}))(newRecipe);
			//console.log(picked); //
	// Running count function
	/*count();*/
});

//NEW - show form to create new recipe
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("recipes/new");
});

//SHOW - shows more info about one recipe
router.get('/:id', async (req, res) => {
    var { id } = req.params;
    var recipe = await Recipe.findById(id).populate('farm');
    res.render('recipes/show', { recipe });
});





//Edit recipe route
router.get("/:id/edit", middleware.checkRecipeOwnership, function(req, res){
	//is user logged in
	if(req.isAuthenticated()){
		Recipe.findById(req.params.id, function(err, foundRecipe){
				res.render("recipes/edit", {recipe: foundRecipe});
		});
	}
	
});

//Update recipe route
router.put("/:id", middleware.checkRecipeOwnership, function(req, res){
	//find and update the correct recipe
	Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
		if(err){
			res.redirect("/recipes");
		} else {
			//redirect to show page
			res.redirect("/recipes");
		}
	});	
});

//Destroy recipe route
router.delete("/:id", middleware.checkRecipeOwnership, function(req, res){
	Recipe.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes");
		}
	});
});


//////////////




///////////////////////////////////
module.exports = router;