var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe");
var middleware = require("../middleware");
var User = require("../models/user");
var Farm = require("../models/farm");
var Cart = require("../models/cart");
var Product = require("../models/product");
var ingredient = require("../models/ingredient");

//////////////////////
//Farm route

//Get all farms
router.get("/", async (req, res) => {
	var farms = await Farm.find({});
	
	res.render("farms/index", {farms});
});

//Post Farm
router.post("/", middleware.isLoggedIn, async (req, res) => {
	var farm = new Farm(req.body);
	await farm.save();
	res.redirect("/farms")
});

//New Farm form
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("farms/new");
});

//Show Farm
router.get('/:id', async (req,res) => {
     var farm = await Farm.findById(req.params.id).populate('recipes');
	console.log(farm.recipes);
	for (const [key, value] of Object.entries(farm.recipes)) {
  console.log(`${key}: ${value}`);
}
	

				
	
		 
    res.render('farms/show', { farm });
});

//new recipe form for farm
router.get("/:id/recipes/new", middleware.isLoggedIn, async (req,res) => {
	var{ id } = req.params;
    var farm = await Farm.findById(id);
	res.render("recipes/new", {farm});
});

//New Recipe Post to farm
 router.post('/:id/recipes', middleware.isLoggedIn, async (req, res) => {
    var {id} = req.params;
    var farm = await Farm.findById(id)
    var { name, image, item, description, author, finArr, dublicate, n} = req.body;
	var items = [];
	 var item = {title: req.body.item.title, val: req.body.item.val};
	items.push(item);
	 console.log('this sis the item',item);
 	var it = item.title;
	var iv = item.val;
	var myresult = [];
		for(var i=0; i<it.length; i++){
			var rez;
			for(var j=0; j<iv.length; j++){	
				rez = [it[i], "" +iv[i]];
			}
			myresult.push(rez);
		};
	 
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
 count();
    var recipe = new Recipe({ name, image, description, author, items, myresult, finArr, dublicate, n});
    farm.recipes.push(recipe);
    recipe.farm = farm;
    await farm.save();
    await recipe.save();
	 console.log('These are the items:', items);
	 
	 ///  console.log(farm);
	
	
    res.redirect(`/farms/${id}`)
});








		
      
	

///////////////////////////////////
module.exports = router;
