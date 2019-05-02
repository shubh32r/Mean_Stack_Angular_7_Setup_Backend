const mongoose = require('mongoose');
const Book = new mongoose.Schema({

	ID: {
		
		type: Number
	},

	BookName: {
		type: String
	},

	AuthorName: {
		type: String
	},

	Catagory: {
		type: String
	},

	Price: {
		type: String
	},
});

/*mongoose.model('Book',Book);*/
module.exports = mongoose.model('books',Book);