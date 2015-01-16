var util = require('util'),
  express = require('express'),
  expressValidator = require('express-validator'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  passport = require('passport'),
  LocalStrategy = require('passport-localapikey').Strategy;

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
  app.use(passport.initialize());

var db = mongoskin.db('mongodb://@localhost:27017/lodgefy', {safe:true})

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(_apikey, done) {
    process.nextTick(function () {

      var User = require('./model/user').User;

      User.findOne({apikey:_apikey},function (err, doc){
        if (err) { return done(err); }
        if (!doc) { return done(null, false, { message: 'Unknown apikey : ' + _apikey }); }
        return done(null, doc);
      });    
    });
  }
));

require('./routes/index')(app, passport);

app.listen(3000, function() {
  console.log('Express server listening on port 3000')
})

