const Joi = require("joi");

// Schema for creating a required tool
const requiredToolCreateSchema = Joi.object({
  tool_name: Joi.string().min(1).required(), // tool_name must be entered and have at least 1 character
});

// // Schema for updating a required tool
// const requiredToolUpdateSchema = Joi.object({
//   tool_name: Joi.string().min(1), // tool_name can be updated, optional
//   status: Joi.number().valid(0, 1), // status can be 0 or 1
//   updated_at: Joi.date().default(() => new Date(), "current timestamp"), // updated_at stores current timestamp
// });

// Middleware to validate tool creation
const validateToolCreate = (req, res, next) => {
  const { error } = requiredToolCreateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }
  next();
};
// // Middleware to validate tool update
// const validateToolUpdate = (req, res, next) => {
//   const { error, value } = requiredToolUpdateSchema.validate(req.body, {
//     abortEarly: false,
//   });
//   if (error) {
//     return res.status(400).json({
//       status: 400,
//       message: error.details.map((detail) => detail.message).join(", "),
//     });
//   }
//   req.body = value; // Attach the validated and enriched object
//   next();
// };

module.exports = { validateToolCreate };
