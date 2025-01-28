const Joi = require('joi');

// Schema for creating a machine
const machineCreateSchema = Joi.object({
    machine_name: Joi.string().required(),
    type: Joi.number().required(),
    company_id: Joi.number().required(),
    location_id: Joi.number().required(),
    section_id: Joi.number().required(),
    sub_section_id: Joi.number().required(),
    department_id: Joi.number().required(),
    manufacturer_name: Joi.string().required(),
    model_no: Joi.string().required(),
    installation_date: Joi.date().timestamp().required(),
    maintenance_schedule: Joi.string().required(),
    current_status: Joi.number().required()
});

// Schema for updating a machine
const machineUpdateSchema = Joi.object({
    machine_name: Joi.string(),
    type: Joi.number(),
    company_id: Joi.number(),
    location_id: Joi.number(),
    section_id: Joi.number(),
    sub_section_id: Joi.number(),
    department_id: Joi.number(),
    manufacturer_name: Joi.string(),
    model_no: Joi.string(),
    installation_date: Joi.date().timestamp(),
    maintenance_schedule: Joi.string(),
    current_status: Joi.number()
});

const validateMachine = (req, res, next) => {
    const { error } = machineCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

const validateAtUpdate = (req, res, next) => {
    const { error } = machineUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
    next();
};

module.exports = { validateMachine, validateAtUpdate };