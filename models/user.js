const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    branch: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('NotesUser', userSchema);