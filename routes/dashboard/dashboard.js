const router = require('express').Router();
const urlSchema = require("../../database/model/url_model");
const Url = urlSchema.Url;

router.get("/dashboard", function (req, res) {
    if (req.isAuthenticated()) {
        Url.find({ userid: req.user.id }, function (err, urls) {
            if (!err) {
                urls.forEach(urls => {
                    urls.shortUrl = process.env.ROOT_URL + urls.shortUrl;
                })
                res.render("pages/dashboard", { urls: urls });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect("/signin");
    }
});

module.exports = router;