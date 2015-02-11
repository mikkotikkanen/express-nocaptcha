/*
 * Express middleware for Google's No CAPTCHA reCAPTCHA 
 * (http://www.google.com/recaptcha/intro/)
 * 
 * When form is posted with No CAPTCHA reCAPTCHA element in it, the middleware
 * will check the generated token against Google API.
 * If token is good, req.validnocaptcha is set as true.
 */
var express = require('express'),
	router = express.Router(),
	request = require('request');

// API key
var secret = null;


/*
 * Main router
 */
router.post('*', function(req, res, next) {
	if(!req.body || !req.body['g-recaptcha-response']) { return next(); }
	
	// Verify user
	request.get({ url: 'https://www.google.com/recaptcha/api/siteverify?secret='+secret+'&response='+req.body['g-recaptcha-response']+'&remoteip='+req.ip, json: true }, function(err, response, body) {
		if(err) { return next(err); }
		if(body.success) { req.validnocaptcha = true; }
		next();
	});
});


/*
 * Factory which receives the options and returns the router
 */
module.exports = function(opts) {
	opts = opts || {};
	
	// Make sure the secret is set
	if(!opts.secret) {
		console.error('Secret key is required for express-nocaptcha to work');
		return null;
	}
	
	secret = opts.secret;
	return router;
};
	