var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'u3FK7RQDCcDzpT00W7JfvFDRw',
    consumerSecret: 'aWUNI0GQGOdUf7RvKa6EoEqeAjfgdbytdNNkBHrPICOBBdBO7F',
    callback: 'http://localhost:3000/twitter2'
});

twitter._accessToken = "191314630-sghGeRly4KFRcoSYAssNgLNf8Jvn64cOAHW0YCuI";

twitter._accessTokenSecret = "BUHHndvyydJg8vaTo0HAPbuvoPbUZ0znotDGg4VS7n1Xm";

twitter.updateStatus = function (_message, _callBack) {
	twitter.statuses("update",
      {status: _message},
      twitter._accessToken,
      twitter._accessTokenSecret,
      _callBack
    );	
}


module.exports = twitter;