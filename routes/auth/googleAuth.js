const router = require("express").Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
    "/auth/google/dashboard",
    passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
    })
);

module.exports = router;