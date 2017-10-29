Passport Hapi OAuth
===================

A simple wrapper to work as a connector between [passport js OAuth strategies](http://www.passportjs.org/) and the [hapi request api](https://hapijs.com/api).

It is configured to work with following OAuth providers: `Google`, `Outlook` and `Facebook`.

Make sure your app has enough permissions for OAuth login (e.g. Any application that calls Google APIs needs to enable APIs in the API Console).


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
	callbackURL: 'YOUR_CALLBACK_URL'
});
const outlookOAuth = new HapiPassport('OutlookStrategy', {
	clientID: 'YOUR_CLIENTID',
	clientSecret: 'YOUR_CLIENTSECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
});
const facebookOAuth = new HapiPassport('FacebookStrategy', {
	clientID: 'YOUR_APP_ID',
	clientSecret: 'YOUR_APP_SECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
});

```

*Route Hanlders*

**1st route to sign in:**
```
server.route({
    method: 'GET',
    path: '/auth/google',
    handler: (request, reply) => {
        googleOAuth.authenticate(request, (url) => {
            // set reply and then redirect
            reply({
                status: 'success'
            }).redirect(url);
        });
    }
});
```
**2nd route to handle callbacks:**
```
server.route({
    method: 'GET',
    path: '/auth/google/login/callback',
    handler: (request, reply) => {
        googleOAuth.authenticateCallBack(request, (err, email) => {
            if (err) {
                // handle error
            } else {
                // AuthProvider login successful
                // continue to authenticate user by email
								// (email is an id for FacebookStrategy)
            }
        });
    }
});
```
