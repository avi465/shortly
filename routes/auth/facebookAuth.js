const router = require('express').Router();
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const userSchema = require("../../database/model/user_model");
const User = userSchema.User;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

// Facebook authentication request
router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/dashboard',
    passport.authenticate('facebook', { failureRedirect: '/signin' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

module.exports = router;