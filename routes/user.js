module.exports = function (app, autenticate) {

	app.get('/user/', function (req, res, next) {
		var User = require('../model/user').User;
		User.find(function (err, data){
		  res.send(data);
		});
	});

	app.post('/user/login', function (req, res, next) {
		req.checkBody('username', 'Please inform a username.').notEmpty();
	  req.checkBody('password', 'Please inform a password.').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			res.send('There have been validation errors: ' + util.inspect(errors), 400);
			return;
		}
		var User = require('../model/user').User;
		User.findOne({
				username:req.body.username, 
				password:req.body.password
			},function (err, data){
		  res.send(data);
		});
	});

	app.post('/user/', function (req, res, next) {
	  var User = require('../model/user').User;
		var u = new User(req.body);
		u.save(function (err, data) {
			if (err) {
				res.send(err);
			}
			else {
				res.send( data );
			}
		});
	})

}