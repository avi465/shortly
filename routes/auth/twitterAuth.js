const router = require("express").Router();
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const userSchema = require("../../database/model/user_model");
const User = userSchema.User;
const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
},
    function (token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/dashboard',
    passport.authenticate('twitter', { failureRedirect: '/signin' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

module.exports = router;