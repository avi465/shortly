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
    email: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Url = mongoose.model("Url", urlSchema);

module.exports = {urlSchema, Url};