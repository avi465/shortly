// user mongoosse model/schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    facebookId: {
        type: String,
        required: false,
    },
    twitterId: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// schema plugin
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

module.exports = { userSchema, User };