const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateSuggestion, validateNoteLink, isLoggedIn} = require("../middleware.js");
const notesLinkController = require("../controllers/notesLink.js");

router.route("/")
    .get(notesLinkController.homePage)
    .post(validateSuggestion, wrapAsync(notesLinkController.addSuggestion))

router.route("/:year")
    .get(isLoggedIn, notesLinkController.branchPage)

router.route("/:year/:branch")
    .get(isLoggedIn, notesLinkController.subjectPage)

router.route("/:year/:branch/:subject")
    .get(isLoggedIn, notesLinkController.unitPage)
    .post(validateNoteLink, wrapAsync(notesLinkController.linkForUnit))

router.route("/:year/:branch/:subject/:unit")
    .get(isLoggedIn, notesLinkController.pdfPage)

module.exports = router;