const Joi = require('joi');

// Schema for creating a location
const locationCreateSchema = Joi.object({
    location_name: Joi.string().min(3).required()
});

// Schema for updating a location
const locationUpdateSchema = Joi.object({
    location_name: Joi.string().min(3).required()
}); // Ensure at least one field is provided for an update

const validateLocation = (req, res, next) => {
    const { error } = locationCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = locationUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateLocation, validateAtUpdate };
