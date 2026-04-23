import Joi from "joi";

export class CourseDataValidator {
  static validateCourseData(data) {
    const courseSchema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      description: Joi.string().min(10).max(500).required(),
      price: Joi.number()
        .positive()
        .precision(2)
        // .valid("USD", "NGN", "EUR")
        // .default("USD")
        .required(),
    });

    return courseSchema.validate(data);
  }

  static validateUpdateCourseData(data) {
    const updateCourseSchema = Joi.object({
      title: Joi.string().min(3).max(100),
      description: Joi.string().min(10).max(500),
      price: Joi.number()
        .positive()
        .precision(2)
        .valid("USD", "NGN", "EUR")
        .default("USD"),
    });

    return updateCourseSchema.validate(data);
  }
}
