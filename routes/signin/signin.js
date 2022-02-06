const router = require('express').Router();
const passport = require('passport');
const userSchema = require('../../database/model/user_model');
const User = userSchema.User;

router.get("/signin", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/signin");
    }
});

router.post("/signin", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/dashboard");
            });
        }
    });
});

module.exports = router;
