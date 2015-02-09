express-nocaptcha
===============

__Express.js middleware for Google's [No CAPTCHA reCAPTCHA](http://www.google.com/recaptcha/intro/)__

When form is posted with [No CAPTCHA reCAPTCHA](http://www.google.com/recaptcha/intro/) element in it, the middleware automatically validates the request token against Google API.


Usage
---------------------------

Load `express-nocaptcha` and set your Google API secret key to it:

```
    app.use(require('express-nocaptcha')({
	    secret: 'abcdefghijklmnopqrstuvxyz'
	}));
```

If captcha is valid, for subsequent middlewares, `req.validnocaptcha` is set to true

```
    if(!req.validnocaptcha) { return next(); }
```
