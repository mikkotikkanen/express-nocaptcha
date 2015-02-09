express-nocaptcha
===============

__Express.js middleware for Google's [No CAPTCHA reCAPTCHA](http://www.google.com/recaptcha/intro/)__

When form is posted with [No CAPTCHA reCAPTCHA](http://www.google.com/recaptcha/intro/) element in it, the middleware automatically validates the request token against Google API.


## Install

```sh
$ npm install express-nocatpcha
```


## Usage

### Setup

Load `express-nocaptcha` and set your Google API secret key to it:

```js
app.use(require('express-nocaptcha')({
  secret: 'abcdefghijklmnopqrstuvxyz'
}));
```


### req.validnocaptcha

If captcha is valid, for subsequent middlewares, `req.validnocaptcha` is set to true

```js
if(!req.validnocaptcha) { return next(); }
```
