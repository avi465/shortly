// url mongoosse model/schema
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl:
    {
        type: String,
        required: true,
    },
    shortUrl:
    {
        type: String,
        required: true,
    },
    clicks:
    {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: String,
    userid: String,
});

const Url = mongoose.model("Url", urlSchema);

module.exports = { urlSchema, Url };