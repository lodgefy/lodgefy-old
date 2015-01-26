var mongoose = require('./mongoose'),
  extend = require('mongoose-schema-extend'),
	Schema = mongoose.Schema,
	ioSchema = Schema({
		name: {type: String, required: true},
		room: {type: String, required: true},
		io: {type: String, required: true, enum: ['input', 'output']},
		values: [{
			value: {type: String, required: true},
			dateTime: {type: Date, default: Date.now}
		}],
		status: {type: String, enum: ['Enabled', 'Disabled', 'Error']},
		notifications: {
			twitter: {type: Boolean, default: false}
		}
	}, { collection : 'ios', discriminatorKey : '_type' }),
	reedSwitchSchema;

ioSchema.index({name: 1, room: 1}, {unique: true, dropDups: true});

ioSchema.methods.updateValueIo = function (value, callback) {
	return;
};

ioSchema.methods.updateValue = function (value, callback) {
	var newValue = {}; 
	newValue.value = this.updateValueIo(value);
	if(newValue.value) {
		this.values.push(newValue);
		this.save(function (err, data) {
			callback(err, data);
			if (this.notifications.twitter)
			{
				var twitter = require('../twitter.js');
				twitter.updateStatus(this.room + " - " + this.name + " - " + value);
			}
		});
	}
	else {
		callback(true, value);
	}
};

reedSwitchSchema = ioSchema.extend({
	io: {type: String, required: true, enum: ['input'], default: 'input'}
});

reedSwitchSchema.methods.updateValueIo = function(value) {
	if (value != 'opened' && value != 'closed') {
		return;
	}
	var values = this.values;
	var lastValue = values.slice(-1).pop();
	if (lastValue && lastValue.value == _value) {
		return;
	}
	return value;
};

exports.Io = mongoose.model('Io', ioSchema);
exports.ReedSwitch = mongoose.model('ReedSwitch', reedSwitchSchema);