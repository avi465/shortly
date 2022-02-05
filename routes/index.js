const router = require('express').Router();

// root route
router.get("/", function (req, res) {
    res.render("pages/hero");
    tempmail = "hiii";
});

router.get("/blogs", function (req, res) {
    res.render("pages/blogs");
    tempmail = "hello";
});

module.exports = router;