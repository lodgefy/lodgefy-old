var util = require('util'),
  express = require('express'),
  session = require('express-session'),
  cookieParser = require('cookie-Parser'),
  expressValidator = require('express-validator'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  passport = require('passport'),
  LocalStrategy = require('passport-localapikey').Strategy,
  five = require("johnny-five");

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'OChicoBateuNoBodeEOBodeBateuNoChico',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
  app.use(passport.initialize());


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

//get all boards from mongodb
var boardPorts = {
  port: "/dev/tty.RandomBot-DevB"
};
board = new five.Board(boardPorts);

var reedSwitches = [{
  pin: 4,
  events: [{name: "down",
    fn: function (){
      console.log("teste");
    }
  }]
}];

board.on("ready", function() {

  reedSwitches.forEach(function(settings) {

    button = new five.Button({
      pin: settings.pin,
      isPullup: true
    });
    
    board.repl.inject({
      button: button
    });

    settings.events.forEach(function(event) {
      button.on(event.name, function() {
        event.fn();
      });
    })

  });
  console.log("Initialized Io");
});



require('./routes/index')(app, passport);

app.listen(3000, function() {
  console.log('Express server listening on port 3000')
})

