const router = require('express').Router();
const passport = require('passport');
const userSchema = require('../../database/model/user_model');
const User = userSchema.User;

router.get("/signup", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/signup");
    }
});

router.post("/signup", function (req, res) {
    User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/signp");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/dashboard");
                });
            }
        }
    );
});


module.exports = router;
