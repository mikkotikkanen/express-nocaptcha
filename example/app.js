/*
 * Example for express-nocaptcha
 * 
 * Requires express, body-parser and express-nocaptcha to run
 */
var express = require('express');
var app = express();

// Serve static files
app.use(express.static(__dirname + '/public'));

// Setup bodyparser
app.use(require('body-parser').urlencoded({ extended: false }));

// Use express-nocaptcha
app.use(require('express-nocaptcha')({
  secret: 'abcdefghijklmnopqrstuvxyz'
}));

// Formhandler for nocaptcha
app.post('/formhandler', function(req, res) {
	if(req.validnocaptcha) {
		res.send('<b>Valid</b> No CAPTCHA reCAPTCHA');
	} else {
		res.send('<b>Invalid</b> No CAPTCHA reCAPTCHA');
	}
});

console.log('');
console.log('express-nocaptcha example running at http://localhost:8080');
app.listen(8080);
