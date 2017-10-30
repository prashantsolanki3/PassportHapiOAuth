[Passport Hapi OAuth](https://www.npmjs.com/package/passport-hapi-oauth)
===================

A simple wrapper to work as a connector between [passport js OAuth strategies](http://www.passportjs.org/) and the [hapi request api](https://hapijs.com/api).

It is configured to work with following OAuth providers: `Google`, `Outlook` and `Facebook`.

Make sure your app has enough permissions for OAuth login (e.g. Any application that calls Google APIs needs to enable APIs in the API Console).


### Install

```
$ npm install passport-hapi-oauth --save
```

### Usage

***Instantiation***

`const oAuthObject = new HapiPassport(Strategy, config, scope = false, advanced = false);`

The last 2 arguments are optional:
`scope` is set to email by default and if you pass `advanced` as true, you will get all user data available based on the scope and permission.
If the last argument (advanced) is not set or set to false, only user email or id will be available in the userData.

Read OAuth provider permissions to understand what scopes can be used.

e.g.:
```
import HapiPassport from 'passport-hapi-oauth';

// simple
const googleOAuth = new HapiPassport('GoogleStrategy', {
	clientID: 'YOUR_CLIENTID',
	clientSecret: 'YOUR_CLIENTSECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
});

// advanced
const facebookOAuth = new HapiPassport('FacebookStrategy', {
	clientID: 'YOUR_APP_ID',
	clientSecret: 'YOUR_APP_SECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
}, {scope: ['email', 'user_likes']}, true);

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
        googleOAuth.authenticateCallBack(request, (err, userData) => {
            if (err) {
                // handle error
            } else {
                // AuthProvider login successful
                // parse userData and authenticate user								
            }
        });
    }
});
```
