const router = require("express").Router();
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const userSchema = require("../../database/model/user_model");
const User = userSchema.User;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id, username: profile.email }, function (err, user) {
                return done(err, user);
            });
        }
    )
);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/auth/google/dashboard",
    passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
    })
);

module.exports = router;