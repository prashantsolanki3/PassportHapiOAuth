Passport Hapi OAuth
===================

A Simple wrapper to work as a connector between [passport js OAuth strategies](http://www.passportjs.org/) and the [hapi request api](https://hapijs.com/api).

it is configured to work with following OAuth providers: `Google`, `Outlook` and `Facebook`.



### Install

```
$ npm install passport-hapi-oauth --save
```

### Usage

*Instantiation*
```
import HapiPassport from 'passport-hapi-oauth';

const googleOAuth = new HapiPassport('GoogleStrategy', {
	clientID: 'YOUR_CLIENTID',
	clientSecret: 'YOUR_CLIENTSECRET',
	callbackURL: 'YOUR_CALLBACKURL'
});
const outlookOAuth = new HapiPassport('OutlookStrategy', {
	clientID: 'YOUR_CLIENTID',
	clientSecret: 'YOUR_CLIENTSECRET',
	callbackURL: 'YOUR_CALLBACKURL'
});
const facebookOAuth = new HapiPassport('FacebookStrategy', {
	clientID: 'YOUR_CLIENTID',
	clientSecret: 'YOUR_CLIENTSECRET',
	callbackURL: 'YOUR_CALLBACKURL'
});

```

*Route Hanlders*

**1st route to sign in:**
```
server.route({
    method: 'GET',
    path: '/auth/google',
    handler: function (request, reply) {
        googleOAuth.authenticate(req, (url) => {
	    // set reply and then redirect
	    reply({status: 'success'}).redirect(url);
        });
    }
});
```
**2nd route to handle callbacks:**
```
server.route({
    method: 'GET',
    path: '/auth/google/login/callback',
    handler: function (request, reply) {
        googleOAuth.authenticateCallBack(req, (err, email) => {
            if (err) {
	        // handle error
		...                                            
            } else {
	        // authprovider login successful 
		// continue to authenticate user by their email
		...
	    }				         
        });
    }
});
```
