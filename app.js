const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
// const Location = mongoose.model('Location');

global.Location = require('./api/models/locationModel');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(
	`mongodb+srv://Josh:${process.env.MONGOPW}@cluster0-rdwjs.mongodb.net/test?retryWrites=true&w=majority`,
	{ useNewUrlParser: true}
)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static('public'));

let locations = [
	 {name: "Bondi Beach", image: "https://images.unsplash.com/photo-1544698206-7af5843dcce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bronte Beach", image: "https://images.unsplash.com/photo-1498393533405-8dd2ddbf6db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Tamarama Beach", image: "https://images.unsplash.com/photo-1556672737-95f72ea2fee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bondi Beach", image: "https://images.unsplash.com/photo-1544698206-7af5843dcce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Bronte Beach", image: "https://images.unsplash.com/photo-1498393533405-8dd2ddbf6db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 {name: "Tamarama Beach", image: "https://images.unsplash.com/photo-1556672737-95f72ea2fee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}
]

app.get("/", function(req, res){
		Location.find({}, (err, locations) => {
		if (err) res.send(err);
		res.render("locations", {locations:locations})
	})
});

// mongodb+srv://Josh:chicken123@cluster0-rdwjs.mongodb.net/test?retryWrites=true&w=majority

// app.get("/locations", function(req, res){
//
// 	res.render("locations", {locations:locations})
// });

app.post("/locations",function(req, res){
	let location = req.body.location;
	let desc = req.body.desc;
	let name = req.body.name;
	let image = req.body.image;
  const newLocation = new Location({ location, name, desc, image });
	newLocation.save((err, location) => {
		if (err) res.send(err);
		res.redirect("/locations/" + location._id);
  });
	// res.redirect("/locations");
});

app.get("/locations/new", function(req, res){
	 res.render("new.ejs");
});

app.get("/locations/:id/delete", function(req, res){
	Location.deleteOne({_id:req.params.id}, function(err){
		res.redirect("/");
	});
});

app.get("/locations/:id", function(req, res){
   Location.findById(req.params.id, function(err, location){
		 if (err) {
		 	res.send(err);
		 }
		 res.render("show.ejs", { location:location });
	 });
});

// Port details
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log("Server is listening on port " + PORT );
});
