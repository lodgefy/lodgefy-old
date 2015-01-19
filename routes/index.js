module.exports = function (app, passport) {

	autenticate = passport.authenticate('localapikey', { failureRedirect: '/' });

	app.get('/', function(req, res, next) {
	  res.send("<html><head></head><body>Welcome to <a href='http://github.com/lodgefy/lodgefy'>lodgefy</a>");
	})

	require('./user')(app, autenticate);
	require('./twitter')(app, autenticate);
	require('./sensor')(app, autenticate);

}