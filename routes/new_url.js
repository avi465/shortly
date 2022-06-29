const router = require('express').Router();
const urlSchema = require("../database/model/url_model");
const Url = urlSchema.Url;
const base62_encoder = require("../function/base62_encoder");

base62_encoder();

const tempmail = "";

router.post("/", (function (req, res) {
    let longUrl = req.body.longUrl;
    Url.find().countDocuments(function (err, count) {
        if (!err) {
            let counter = count;
            if (counter == 0) {
                const url = new Url({
                    longUrl: "None",
                    shortUrl: "None"
                })
                url.save(function (err) {
                    (!err) ? res.send({ "shortUrl": "First index of database" }) : res.send(err);
                })

            } else {
                // short url generating and saving to database
                if (req.isAuthenticated()) {
                    const url = new Url({
                        longUrl: longUrl,
                        shortUrl: base62_encoder(counter),
                        username: req.user.username,
                        userid: req.user.id
                    })
                    url.save(function (err) {
                        (!err) ? res.send({ "shortUrl": process.env.ROOT_URL + url.shortUrl }) : res.send(err);
                    })
                } else {
                    const url = new Url({
                        longUrl: longUrl,
                        shortUrl: base62_encoder(counter)
                    })
                    url.save(function (err) {
                        (!err) ? res.send({ "shortUrl": process.env.ROOT_URL + url.shortUrl }) : res.send(err);
                    })
                }
            }
        } else {
            res.send(err);
        }
    })
})
);

module.exports = router;