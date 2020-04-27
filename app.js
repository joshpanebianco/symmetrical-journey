const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
// const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/travel_tips");
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
const locationSchema = new mongoose.Schema({
	 name: String,
	 image: String
});

const Location =  mongoose.model("Campground", locationSchema);

Location.create(
	{
		name: "Bondi Beach",
		image: "https://images.unsplash.com/photo-1544698206-7af5843dcce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
	}, function(err, location){
		if(err){
			console.log(err);
		} else {
			console.log("Newly created location");
			console.log(location);
		}
	});

let locations = [
	 {name: "Bondi Beach", image: "https://images.unsplash.com/photo-1544698206-7af5843dcce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bronte Beach", image: "https://images.unsplash.com/photo-1498393533405-8dd2ddbf6db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Tamarama Beach", image: "https://images.unsplash.com/photo-1556672737-95f72ea2fee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bondi Beach", image: "https://images.unsplash.com/photo-1544698206-7af5843dcce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bronte Beach", image: "https://images.unsplash.com/photo-1498393533405-8dd2ddbf6db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Tamarama Beach", image: "https://images.unsplash.com/photo-1556672737-95f72ea2fee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}
]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/locations", function(req, res){

	res.render("locations", {locations:locations})
});

app.post("/locations",function(req, res){
	let name = req.body.name;
	let image = req.body.image;
	let newLocation = {name: name, image: image};
	locations.push(newLocation);
  // res.send("You hit the post");
	res.redirect("/locations");
});

app.get("/locations/new", function(req, res){
	 res.render("new.ejs");
});

// Port details
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log("Server is listening on port " + PORT );
});
