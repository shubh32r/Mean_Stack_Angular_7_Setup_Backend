const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BOOK',{useNewUrlParser: true},(err)=>{
	if(!err){
		console.log('connection successful');
	}
	else{console.log('Error in DB Connection:  '+err)}
})