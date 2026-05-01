import Joi from "joi";

export class EnrollmentDataValidator {
  static validateEnrollmentData(data) {
    const enrollmentSchema = Joi.object({
      user_id: Joi.string().required(),
      course_id: Joi.string().required(),
      progress: Joi.number()
        .min(0)
        .max(100)
        .strict()
        .messages({ "number.base": "Progress must be a number", "number.min": "Progress must be at least 0", "number.max": "Progress must be at most 100" })
        .required(),
    });

    return enrollmentSchema.validate(data);
  }

  static validateUpdateEnrollmentData(data) {
    const updateEnrollmentSchema = Joi.object({
      progress: Joi.number().min(0).max(100).message("Progress must be a number or between 0 and 100"),
    });

    return updateEnrollmentSchema.validate(data);
  }
}
