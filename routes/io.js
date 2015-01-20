module.exports = function(app, autenticate) {

  app.get('/io/', function (req, res, next) {
    var Io = require('../model/io').Io;
    Io.find(function (err, data){
      res.send(data);
    });
  });

  app.post('/io/', function (req, res, next) {
    var Io = require('../model/io').Io;
    var io = new Io(req.body);
    io.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  });

  app.post('/reed/', function (req, res, next) {
    var ReedSwitch = require('../model/io').ReedSwitch;
    var reedSwitch = new ReedSwitch(req.body);
    reedSwitch.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  });

  app.post('/io/updateValue', function (req, res, next) {
    var Io = require('../model/io').Io;

    Io.findById(req.body.id, function (err, data) {
      
      data.updateValue(req.body.value, function (err, data) {
        res.send(data);  
      }); 
      
    });
    
  });
  app.post('/io/updateValueReed', function (req, res, next) {
    var ReedSwitch = require('../model/io').ReedSwitch;

    ReedSwitch.findById(req.body.id, function (err, data) {
      
      data.updateValue(req.body.value, function (err, data) {
        res.send(data);  
      }); 
      
    });
    
  });

}