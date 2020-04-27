const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
		name: {
			type: String,
			required: "Please add the name"
		},
		image: {
			type: String,
			required: "Please add an image"
		},
		desc: {
			type: String,
			required: "Please add a description"
		},
		location: {
			type: String,
			required: "Please add the location"
		}
	}, {collection: 'location'});


module.exports = mongoose.model('Location', locationSchema)
