const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suggestionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    faculty_Number: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    suggestions: {
        type: String,
        required: true,
    },
})

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;