// user mongoosse model/schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {userSchema, User};