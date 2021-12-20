var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var Comment   = require("./models/comment");
var Farm = require("./models/farm");
var Cart = require("./models/cart");
var data = [
    {
        name: "Mushroom Risotto", 
        image: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/35/1504128527-delish-mushroom-risotto.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Lazagne", 
        image: "https://cafedelites.com/wp-content/uploads/2018/01/Mamas-Best-Lasagna-IMAGE-43.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Pizza", 
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
	

function seedDB(){
   //Remove all recipes
   Recipe.deleteMany({}, function(err){
        /* if(err){
            console.log(err);
        }
        console.log("removed recipes!");
		//add a few recipes
		 data.forEach(function(seed){
    		Recipe.create(seed, function(err, recipe){
            	if(err){
            		console.log(err)
            	} else {
            		console.log("added a recipe");
					//create a comment
					Comment.create(
                            {
                                text: "This place is great",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    recipe.comments.push(comment);
                                    recipe.save();
                                    console.log("Created new comment");
								}
							});
				}
			});	
		}); */
	});
	
	Farm.deleteMany({}, function(err){
	});
	
}
 
module.exports = seedDB;