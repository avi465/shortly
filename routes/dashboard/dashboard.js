const router = require('express').Router();

const urlSchema = require("../../database/model/url_model");

const Url = urlSchema.Url;

router.get("/dashboard", function (req, res) {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render("pages/dashboard");
    } else {
        res.redirect("/signin");
    }
});

module.exports = router;