const router = require('express').Router();

// root route
router.get("/", function (req, res) {
    res.render("pages/hero");
    tempmail = "hiii";
});

router.get("/blogs", function (req, res) {
    res.render("pages/blogs");
});

router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            // handle error
            console.error(err);
            return;
        }
        res.redirect("/");
    });
});

module.exports = router;