module.exports = function(app, passport) {

	autenticate = passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' });

	app.get('/', function(req, res, next) {
	  res.send("<html><head></head><body>Welcome to <a href='http://github.com/lodgefy/lodgefy'>lodgefy</a>");
	})

	require('./sensor')(app, autenticate);
	require('./user')(app, autenticate);

}