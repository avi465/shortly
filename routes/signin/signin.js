const router = require('express').Router();
const userSchema = require('../../database/model/user_model');
const User = userSchema.User;

router.get("/signin", function (req, res) {
    res.render("pages/signin");
});

router.post("/signin", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }, function (err, data) {
        if (!err) {
            if (data) {
                if (data.password == password) {
                    res.redirect("/dashboard");
                    tempmail = req.body.email;
                } else {
                    res.redirect("/signin");
                }
            } else {
                res.redirect("/signin");
            }
        } else {
            res.send(err);
        }
    });
});



module.exports = router;
