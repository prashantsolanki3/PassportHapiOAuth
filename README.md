Passport Hapi OAuth
===================
[![NPM](https://nodei.co/npm/passport-hapi-oauth.png?downloads=true&downloadRank=true)](https://nodei.co/npm/passport-hapi-oauth/)
[![npm version](https://badge.fury.io/js/passport-hapi-oauth.svg)](https://badge.fury.io/js/passport-hapi-oauth)

A simple wrapper to work as a connector between [passport js OAuth strategies](http://www.passportjs.org/) and the [hapi request api](https://hapijs.com/api).

It is configured to work with following OAuth providers: `Google`, `Outlook` and `Facebook`.

>Make sure your app has enough permissions for OAuth login (e.g. Any application that calls Google APIs needs to enable APIs in the API Console).


### Install

```
$ npm install passport-hapi-oauth --save
```

### Usage
___
***Instantiation***


```javascript
import HapiPassport from 'passport-hapi-oauth';

// simple
const googleOAuth = new HapiPassport('GoogleStrategy', {
	clientID: 'YOUR_CLIENT_ID',
	clientSecret: 'YOUR_CLIENT_SECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
});

// advanced
const googleOAuth = new HapiPassport('GoogleStrategy', {
	clientID: 'YOUR_CLIENT_ID',
	clientSecret: 'YOUR_CLIENT_SECRET',
	callbackURL: 'YOUR_CALLBACK_URL'
}, {scope: ['email', 'profile', 'openid']});

```
|     arguments     |                                             values                                            |
|:-----------------:|:---------------------------------------------------------------------------------------------:|
|      strategy     | **GoogleStrategy**, **OutlookStrategy** or  **FacebookStrategy**                              |
|       config      | { clientID: 'YOUR_APP_ID', clientSecret: 'YOUR_APP_SECRET', callbackURL: 'YOUR_CALLBACK_URL'} |
| scope* (optional) | { scope: [ 'SCOPE_1' , 'SCOPE_2' , ... ] }                                                    |

\*Read OAuth provider permissions to understand what scopes can be used.

___
*Route Hanlders*

**1st route to sign in:**
```javascript
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
```javascript
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
