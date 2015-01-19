	
	var mongoose = require('./mongoose');
	 
	var Schema = mongoose.Schema;
	var sensorSchema = Schema({
		name: {type: String, required: true},
	  room: {type: String, required: true},
	  type: {type: String, required: true, enum: ['Button', 'Reed Switch', 'Motion Detection', 'Temperature'] },
	  values: [{
  		value: {type: String, required: true},
	  	dateTime: {type: Date, default: Date.now}
	  }],
	  status: {type: String, enum: ['Enabled', 'Disabled', 'Error']}
	});

	sensorSchema.index({name: 1, room: 1}, {unique: true, dropDups: true});
	 
	sensorSchema.methods.updateValue = function (_value, _callBack) {
					
			var value = {} 

			sendTwitter = false;

			switch (this.type) {
				case "Button":
					break;
				case "Reed Switch":

					if (_value != 'opened' && _value != 'closed')
					{
						_callBack(true, _value);
						return;
					}
					
					var values = this.values;
					var lastValue = values.slice(-1).pop();
					
					if (lastValue && lastValue.value == _value)
					{
						_callBack(true, _value);
						return;
					}

					sendTwitter = true;
					

					break;
				case "Motion Detection":
					//if motion detection and has no motion detection in xtime
					break;
				case "Temperature":
					//update new temperature after x time
					break;
			}

			value.value = _value;

			this.values.push(value);
			
			this.save(function (_err, _data) {
				_callBack(_err, _data);
				if (sendTwitter)
				{
					var twitter = require('../twitter.js');
					twitter.updateStatus(this.room + " - " + this.name + " - " + _value);
				}
			});	
	}

	exports.Sensor = mongoose.model('Sensor', sensorSchema);


