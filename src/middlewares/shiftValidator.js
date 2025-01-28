const Joi = require('joi');

// Schema for creating a shift
const shiftCreateSchema = Joi.object({
    shift_name: Joi.string().min(3).required(),
    shift_start_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    shift_end_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    time_mode: Joi.string().required()
});

// Schema for updating a shift
const shiftUpdateSchema = Joi.object({
    shift_name: Joi.string().min(3).required(),
    shift_start_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    shift_end_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    time_mode: Joi.string()
}); // Ensure validation for update

const validateShift = (req, res, next) => {
    const { error } = shiftCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = shiftUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateShift, validateAtUpdate };