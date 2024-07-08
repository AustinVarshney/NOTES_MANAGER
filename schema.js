const Joi = require('joi');

module.exports.suggestionSchema = Joi.object({
    name: Joi.string().required(),
    faculty_Number: Joi.string().required(),
    branch: Joi.string().required(),
    year: Joi.string().required(),
    suggestions: Joi.string().required(),
});

module.exports.notesLinkSchema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string().required(),
    link: Joi.string().required(),
})