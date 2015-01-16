var mongoose = require('mongoose');
	mongoose.connect('mongodb://@localhost:27017/lodgefy');
	 
	var db = mongoose.connection;
	 
	db.on('error', function (err) {
	console.log('connection error', err);
	});
	db.once('open', function () {
	console.log('connected.');
	});

module.exports = mongoose;