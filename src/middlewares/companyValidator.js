const Joi = require('joi');

// Schema for creating a company
const companyCreateSchema = Joi.object({
    company_name: Joi.string().min(3).required()
});

// Schema for updating a company
const companyUpdateSchema = Joi.object({
    company_name: Joi.string().min(3).required()
}); // Ensure at least one field is provided for an update

const validateCompany = (req, res, next) => {
    const { error } = companyCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = companyUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateCompany, validateAtUpdate };
