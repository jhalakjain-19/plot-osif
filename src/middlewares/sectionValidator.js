const Joi = require('joi');

// Schema for creating a section
const sectionCreateSchema = Joi.object({
    section_name: Joi.string().min(3).required()
});

// Schema for updating a section
const sectionUpdateSchema = Joi.object({
    section_name: Joi.string().min(3).required()
}); // Ensure at least one field is provided for an update

const validateSection = (req, res, next) => {
    const { error } = sectionCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = sectionUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateSection, validateAtUpdate };
