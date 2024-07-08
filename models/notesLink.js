const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteLinkSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    subject: {
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
    link: {
        type: String,
        required: true,
    },
})

const NoteLink = mongoose.model("NoteLink", noteLinkSchema);
module.exports = NoteLink;