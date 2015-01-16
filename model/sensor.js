	
	var mongoose = require('./mongoose');
	 
	var Schema = mongoose.Schema;
	var sensorSchema = Schema({
		name: {type: String, required: true},
	  room: {type: String, required: true},
	  type: {type: String, required: true, enum: ['Button', 'Reed Switch', 'Motion Detection', 'Temperature'] },
	  values: [{
  		value: {type: Number},
	  	dateTime: {type: Date, default: Date.now}
	  }],
	  status: {type: String, enum: ['Enabled', 'Disabled', 'Error']}
	});

	sensorSchema.index({name: 1, room: 1}, {unique: true, dropDups: true});
	 
	exports.Sensor = mongoose.model('Sensor', sensorSchema);


