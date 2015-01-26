module.exports = function (app, autenticate) {

  app.get('/twitter/', function (req, res, next) {
    var twitter = require('../twitter.js');
    twitter.getRequestToken(function (_error, _requestToken, _requestTokenSecret, _results){
      if (_error) {
        res.send("Error getting OAuth request token : " + _error);
      } else {
        req.session.requestToken = _requestToken;
        req.session.requestTokenSecret = _requestTokenSecret;
        console.log(_requestToken + " - " + _requestTokenSecret);
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+_requestToken);
      }
    });
  });

  app.get('/twitter2/', function (req, res, next) {
    var twitter = require('../twitter.js');
    twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, req.query.oauth_verifier,
      function (_error, _accessToken, _accessTokenSecret, _results) {
        if (_error) {
          res.send(_error);
        } else {
          console.log(_accessToken);
          console.log(_accessTokenSecret);
        }
      }
    );
  });

  app.get('/twitter3/', function (req, res, next) {
    var twitter = require('../twitter.js');
    twitter.updateStatus("Hey there, I'ts work!");
    res.send('async send message.');
  });

};