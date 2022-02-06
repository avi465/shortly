const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");

const googleStrategy = passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id, username: profile.email }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );

  module.exports = googleStrategy;