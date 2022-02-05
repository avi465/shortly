const router = require('express').Router();

const urlSchema = require("../../database/model/url_model");

const Url = urlSchema.Url;

const tempmail = "";

router.get("/dashboard", function (req, res) {
    Url.find({ email: tempmail }, function (err, data) {
        if (!err) {
            console.log(tempmail);
            res.render("pages/dashboard");
        } else {
            res.send(err)
        }
    })
});

module.exports = router;