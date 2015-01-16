module.exports = function(app, autenticate) {


  app.get('/sensor/', function(req, res, next) {
    var Sensor = require('../model/sensor').Sensor;

    Sensor.find(function (err, data){
      res.send(data);
    });
  });

  app.post('/sensor/', function (req, res, next) {
    var Sensor = require('../model/sensor').Sensor;
    var s = new Sensor(req.body);
    s.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  });

  app.post('/sensor/updateSensor', function (req, res, next) {
    var Sensor = require('../model/sensor').Sensor;
    var s = Sensor().findById(req.id);
    s.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  });

}