import Joi from "joi";

export class UserDataValidator {
  static validateUserData(data) {
    const userSchema = Joi.object({
      fullname: Joi.string().min(3).max(50).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "org", "edu"] },
        })
        .required(),

      password: Joi.string().min(6).max(30).required(),
      role: Joi.string().valid("student", "instructor").required(),
    });

    return userSchema.validate(data);
  }

  static validateUpdateUserData(data) {
    const updateUserSchema = Joi.object({
      fullname: Joi.string().min(3).max(50),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "org", "edu"] },
      }),

      password: Joi.string().min(6).max(30),
      role: Joi.string().valid("student", "instructor"),
    });
    return updateUserSchema.validate(data);
  }
}
