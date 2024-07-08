const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.getSignupForm)
    .post(userController.addUser)

router.route("/login")
    .get(userController.getLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.loginUser)

router.route("/logout")
    .get(userController.logoutUser)

module.exports = router;