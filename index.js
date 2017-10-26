import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as OutlookStrategy } from 'passport-windowslive';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export default class HapiPassport {
    
    /**
     * Constructor
     * @param strategy
     * @param config
     */
    constructor(strategy, config) {
        if (typeof strategy !== 'string' || !['GoogleStrategy', 'OutlookStrategy'].includes(strategy)) {
            throw new Error('This module requires a valid strategy upon instantiation, please use one of the following: \'GoogleStrategy\' or \'OutlookStrategy\'');
        }
        if (typeof config !== 'object') {
            throw new Error('This module requires a valid configuration upon instantiation');
        }
        if (strategy === 'GoogleStrategy') {
            this._provider = 'google';
            passport.use(new GoogleStrategy(config, (accessToken, refreshToken, profile, done) => {
                done(null, profile.emails[0].value); 
            }));
        } else if (strategy === 'OutlookStrategy') {
            this._provider = 'windowslive';
            passport.use(new OutlookStrategy(config, (accessToken, refreshToken, profile, done) => {
                done(null, profile.emails[0].value); 
            }));
        } else if (strategy === 'FacebookStrategy') {
            this._provider = 'windowslive';
            passport.use(new FacebookStrategy(config, (accessToken, refreshToken, profile, done) => {
                done(null, profile.emails[0].value); 
            }));
        }
        passport.serializeUser(function(user, cb) {
            cb(null, user);
        });        
        passport.deserializeUser(function(obj, cb) {
            cb(null, obj);
        });        
        this._strategy = strategy;       
    }

    authenticate(req, callback) {
        const res = {
            setHeader(data, url) {
                callback(url);
            }
        };
        if (this._strategy === 'GoogleStrategy') {
            passport.authenticate('google', { scope: ['profile', 'email'] }).call(this, req, res, () => {});
        } else if (this._strategy === 'OutlookStrategy')  {
            passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }).call(this, req, res, () => {});   
        } else if (this._strategy === 'FacebookStrategy')  {
            passport.authenticate('facebook').call(this, req, res, () => {});   
        }
    }
    
    authenticateCallBack(req, callback) {
        const request = {
            query: req.query,
            logIn: email => callback(null, email)            
        };
        passport.authenticate(this._provider, {}).call(this, request, {},  (err) => {
            if (err) {
                callback('Failed to authenticate user.');
            }
        });        
    }

}