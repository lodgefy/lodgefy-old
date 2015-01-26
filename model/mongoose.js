var mongoose = require('mongoose'),
	connection = mongoose.connect('mongodb://@localhost:27017/lodgefy').connection,
	db = connection;
	db.on('error', function (err) {
		console.log('connection error', err);
	});
	db.once('open', function () {
		console.log('connected.');
	});
module.exports = mongoose;