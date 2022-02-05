const router = require('express').Router();
const userSchema = require('../../database/model/user_model');
const User = userSchema.User;

router.get("/signup", function (req, res) {
    res.render("pages/signup");
});

router.post("/signup", function (req, res) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect("/signup");
        } else {
            res.redirect("/dashboard");
            tempmail = req.body.email;
        }
    });
});

module.exports = router;
