
/*
 * GET users listing.
 */
var log = require('log4js').getLogger("user");

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.hello = function(req, res) {
    res.send('Hello, the time is ' + new Date().toString());
};