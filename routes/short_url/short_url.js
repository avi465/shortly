const router = require('express').Router();

const urlSchema = require("../../database/model/url_model");

const Url = urlSchema.Url;

router.get("/:url", function (req, res) {
    Url.findOne({ shortUrl: req.params.url }, function (err, data) {
        if (!err) {
            console.log(data);
            if (data != null) {
                res.redirect(data.longUrl);
            } else {
                res.send("URL not found");
            }
        } else {
            res.send(err);
        }
    });

    Url.updateOne({ shortUrl: req.params.url }, { $inc: { clicks: 1 } }, function (err, data) {
        if (err) {
            res.send(err);
        }
    });
})

module.exports = router;