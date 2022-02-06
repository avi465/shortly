require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const { timeout } = require('nodemon/lib/config');
// const path = require("path");
const mainRouter = require("./routes/index");
const newurlRouter = require("./routes/new_url");
const signinRouter = require("./routes/signin/signin");
const signupRouter = require("./routes/signup/signup");
// const facebookAuthRouter = require("./routes/auth/facebookAuth");
const googleAuthRouter = require("./routes/auth/googleAuth");
// const twitterAuthRouter = require("./routes/auth/twitterAuth");
const dashboardRouter = require("./routes/dashboard/dashboard");
const shortUrlRouter = require("./routes/short_url/short_url");
// mongo db connection
require("./database/connection/userdb");

const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const MongoDBStore = require("connect-mongodb-session")(session);
// const findOrCreate = require("mongoose-findorcreate");

// model
const userSchema = require('./database/model/user_model');
const User = userSchema.User;
const store = require('./database/model/session_model');


// ejs
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// cookies plugin
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        },
        store: store,
        resave: false,
        saveUninitialized: false,
    })
);

// passport initialization 
app.use(passport.initialize());
app.use(passport.session());

// create strategy
passport.use(User.createStrategy());

// serialize and deserialize
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// main routers
app.use(mainRouter);

// new url routers
app.use(newurlRouter);

// short url redirecting
app.use(shortUrlRouter);

// signin router
app.use(signinRouter);

// signup router
app.use(signupRouter);

// facebook auth router
// app.use(facebookAuthRouter);

// google auth router
app.use(googleAuthRouter);

// twitter auth router
// app.use(twitterAuthRouter);

// dashboard router
app.use(dashboardRouter);

app.post("/api/url", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// 404 error
app.use(function (req, res) {
    res.status(400).send("404 error");
});

// 500 error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("500: Internal server error");
});

//Running server
app.listen(process.env.PORT || 3000, () => console.log("server is running on port 3000"));