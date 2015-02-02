/*
 * Express middleware for Google's No CAPTCHA reCAPTCHA 
 * 
 * http://www.google.com/recaptcha/intro/
 */
var express = require('express'),
	router = express.Router(),
	request = require('request');

var secret = null;

router.post('*', function(req, res, next) {
	if(!req.body || !req.body['g-recaptcha-response']) { return next(); }
	
	// Verify user
	request.get({ url: 'https://www.google.com/recaptcha/api/siteverify?secret='+secret+'&response='+req.body['g-recaptcha-response']+'&remoteip='+req.ip, json: true }, function(err, response, body) {
		if(err) { return next(err); }
		if(body.success) { req.nocaptcha = true; }
		next();
	});
});


/*
 * 
 */
module.exports = function(opts) {
	opts = opts || {};
	
	if(!opts.secret) {
		console.error('Secret key is required for express-nocaptcha to work');
		return process.exit(1);
	}
	
	secret = opts.secret;
	return router;
};
	