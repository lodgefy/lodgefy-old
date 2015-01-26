var mongoose = require('./mongoose'),
	Schema = mongoose.Schema,
	boardSchema = Schema({
	  name: {type: String, required: true},
	  address: {type: String, required: true },
	  type: {type: String, required:true , enum: ['Arduino']}
	});
exports.Board = mongoose.model('Board', boardSchema);