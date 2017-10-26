'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth');

var _passportWindowslive = require('passport-windowslive');

var _passportFacebook = require('passport-facebook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HapiPassport = function () {

    /**
     * Constructor
     * @param strategy
     * @param config
     */
    function HapiPassport(strategy, config) {
        _classCallCheck(this, HapiPassport);

        if (typeof strategy !== 'string' || !['GoogleStrategy', 'OutlookStrategy'].includes(strategy)) {
            throw new Error('This module requires a valid strategy upon instantiation, please use one of the following: \'GoogleStrategy\' or \'OutlookStrategy\'');
        }
        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
            throw new Error('This module requires a valid configuration upon instantiation');
        }
        if (strategy === 'GoogleStrategy') {
            this._provider = 'google';
            _passport2.default.use(new _passportGoogleOauth.OAuth2Strategy(config, function (accessToken, refreshToken, profile, done) {
                done(null, profile.emails[0].value);
            }));
        } else if (strategy === 'OutlookStrategy') {
            this._provider = 'windowslive';
            _passport2.default.use(new _passportWindowslive.Strategy(config, function (accessToken, refreshToken, profile, done) {
                done(null, profile.emails[0].value);
            }));
        } else if (strategy === 'FacebookStrategy') {
            this._provider = 'facebook';
            _passport2.default.use(new _passportFacebook.Strategy(config, function (accessToken, refreshToken, profile, done) {
                done(null, profile.emails[0].value);
            }));
        }
        _passport2.default.serializeUser(function (user, cb) {
            cb(null, user);
        });
        _passport2.default.deserializeUser(function (obj, cb) {
            cb(null, obj);
        });
        this._strategy = strategy;
    }

    _createClass(HapiPassport, [{
        key: 'authenticate',
        value: function authenticate(req, callback) {
            var res = {
                setHeader: function setHeader(data, url) {
                    callback(url);
                }
            };
            if (this._strategy === 'GoogleStrategy') {
                _passport2.default.authenticate('google', { scope: ['profile', 'email'] }).call(this, req, res, function () {});
            } else if (this._strategy === 'OutlookStrategy') {
                _passport2.default.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }).call(this, req, res, function () {});
            } else if (this._strategy === 'FacebookStrategy') {
                _passport2.default.authenticate('facebook').call(this, req, res, function () {});
            }
        }
    }, {
        key: 'authenticateCallBack',
        value: function authenticateCallBack(req, callback) {
            var request = {
                query: req.query,
                logIn: function logIn(email) {
                    return callback(null, email);
                }
            };
            _passport2.default.authenticate(this._provider, {}).call(this, request, {}, function (err) {
                if (err) {
                    callback('Failed to authenticate user.');
                }
            });
        }
    }]);

    return HapiPassport;
}();

exports.default = HapiPassport;