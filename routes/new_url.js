const router = require('express').Router();
const urlSchema = require("../database/model/url_model");
const Url = urlSchema.Url;
const base62_encoder = require("../function/base62_encoder");

base62_encoder();

const tempmail = "";

router.post("/", (function (req, res) {
    // long url string checking
    let longUrl = "";
    if (req.body.longUrl.includes("http://") || req.body.longUrl.includes("https://")) {
        longUrl = req.body.longUrl;
    } else {
        longUrl = "http://" + req.body.longUrl;
    }

    Url.find().countDocuments(function (err, count) {
        if (!err) {
            let counter = count;
            console.log(counter);
            if (counter == 0) {
                const url = new Url({
                    longUrl: "None",
                    shortUrl: "None"
                })

                url.save(function (err) {
                    if (!err) {
                        res.send({"shortUrl": "http://localhost:3000/su/" + url.shortUrl});
                    } else {
                        res.send(err);
                    }
                })

            } else {
                if (tempmail != "") {
                    // short url generating and saving to database
                    const url = new Url({
                        longUrl: longUrl,
                        shortUrl: base62_encoder(counter),
                        email: tempmail
                    })

                    url.save(function (err) {
                        if (!err) {
                            console.log("http://localhost:3000/su/" + url.shortUrl);
                            res.send({"shortUrl": "http://localhost:3000/su/" + url.shortUrl});
                        } else {
                            res.send(err);
                        }
                    })
                } else {
                    // short url generating and saving to database
                    const url = new Url({
                        longUrl: longUrl,
                        shortUrl: base62_encoder(counter),
                        email: null
                    })

                    url.save(function (err) {
                        if (!err) {
                            console.log("http://localhost:3000/su/" + url.shortUrl);
                            res.send({"shortUrl": "http://localhost:3000/su/" + url.shortUrl});
                        } else {
                            res.send(err);
                        }
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