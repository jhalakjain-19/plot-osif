const Joi = require('joi');

// Schema for creating a sub section
const subSectionCreateSchema = Joi.object({
    sub_section_name: Joi.string().min(3).required()
});

// Schema for updating a sub section
const subSectionUpdateSchema = Joi.object({
    sub_section_name: Joi.string().min(3).required()
}); // Ensure at least one field is provided for an update

const validateSubSection = (req, res, next) => {
    const { error } = subSectionCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = subSectionUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateSubSection, validateAtUpdate };
