const NotesUser = require("../models/user.js");

module.exports.getSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.addUser = async (req, res) => {
    try{
        let {username, password, branch, year, email} = req.body;
        const newUser = new NotesUser({username, branch, year, email});
        const registeredUser = await NotesUser.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "You successfully SignedUp");
            res.redirect("/note");
        })
    } catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.getLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "You successfully Logged in!");
    let redirectUrl = res.locals.redirectUrl || "/note"
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You Logged Out!");
        res.redirect("/note");
    })
}