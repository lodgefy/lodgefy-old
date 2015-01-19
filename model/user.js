
	var mongoose = require('./mongoose');
	 
	var Schema = mongoose.Schema;
	var userSchema = Schema({
	  username: {type: String, required: true, index: {unique: true, dropDups: true} },
	  password: {type: String },
	  apikey: {type: String, index: {unique: true}, default: guid}
	});
	 
	userSchema.methods.updateApikey = function () {
	  this.apikey = guid()
	  return this.apikey;
	}

	userSchema.methods.findByApikey = function (_apikey) {
		this.findOne({apikey:_apikey},function (err, data){
		  return data;
		});
	}
	
	exports.User = mongoose.model('User', userSchema);

	function guidPart() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	               .toString(16)
	               .substring(1);
	}

	function guid() {
		return guidPart() + guidPart() + guidPart();
	}


