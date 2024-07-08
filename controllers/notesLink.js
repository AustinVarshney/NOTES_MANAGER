const Suggestion = require("../models/suggestion.js");
const NotesLink = require("../models/notesLink.js");

module.exports.homePage = (req, res) => {
    res.render("notes/year.ejs");
}

module.exports.addSuggestion = async (req, res) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must login to give the suggestion!");
        return res.redirect("/login");
    }
    let {name, faculty_Number, branch, year, suggestions} = req.body;
    let sampleSuggestion = new Suggestion({
        name: name,
        faculty_Number: faculty_Number,
        branch: branch,
        year: year,
        suggestions: suggestions,
    })        
    await sampleSuggestion.save();
    // console.log("Sample was saved.");
    req.flash("success", "Your suggestion has been recorded");
    res.redirect("/note");
}

module.exports.branchPage = (req, res) => {
    let {year} = req.params;
    res.render("notes/branch.ejs", {year});
}

module.exports.subjectPage = (req, res) => {
    let {year, branch} = req.params;
    if(year == 1){
        res.render(`notes/subjects/${year}-anyBranch.ejs`, {year, branch});
    } else{
        res.render(`notes/subjects/${year}-${branch}.ejs`, {year, branch});
    }
}

module.exports.unitPage = (req, res) => {
    let {year, branch, subject} = req.params;
    res.render("notes/units.ejs", {year, branch, subject});
}

module.exports.linkForUnit = async (req, res) => {
    let {year, branch, subject} = req.params;
    let {name, unit, link} = req.body;
    let sampleLink = new NotesLink({
        name: name,
        unit: unit,
        subject: subject,
        branch: branch,
        year: year,
        link: link,
    })
    await sampleLink.save();
    console.log("Link was saved!");
    req.flash("success", "Thank You for providing your notes!");
    res.redirect(`/note/${year}/${branch}/${subject}`);
}

module.exports.pdfPage = (req, res) => {
    let {year, branch, subject, unit} = req.params;
    if(unit == 1 || unit == 2 || unit == 3 || unit == 4){
        res.render("notes/addLink.ejs", {year, branch, subject, unit});
    }else{
        res.render("notes/pdf.ejs", {unit});
    }
}