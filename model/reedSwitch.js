
var Io = require('./Io').Io,
	mongoose = require('./mongoose'),
	Schema = mongoose.Schema;
	console.log(Io.schema.paths);
	reedSwitchSchema = Schema(Io.schema.paths);

	exports.ReedSwitch = mongoose.model('ReedSwitch', reedSwitchSchema);
