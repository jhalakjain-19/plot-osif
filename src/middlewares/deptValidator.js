const Joi = require('joi');

// Schema for creating a department
const deptCreateSchema = Joi.object({
    name: Joi.string().min(3).required()
});

// Schema for updating a department
const deptUpdateSchema = Joi.object({
    name: Joi.string().min(3).required()
}); // Ensure at least one field is provided for an update

const validateDept = (req, res, next) => {
    const { error } = deptCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = deptUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateDept, validateAtUpdate };
