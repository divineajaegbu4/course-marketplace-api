import Joi from "joi";

export class EnrollmentDataValidator {
    static validateEnrollmentData(data) {
        const enrollmentSchema = Joi.object({
            user_id: Joi.string().required(),
            course_id: Joi.string().required(),
            progress: Joi.number().min(0).max(100).valid("%").required()
        })

        return enrollmentSchema.validate(data)
    }

    static validateUpdateEnrollmentData(data) {
        const updateEnrollmentSchema = Joi.object({
            progress: Joi.number().min(0).max(100).valid("%")
        })

        return updateEnrollmentSchema.validate(data)
    }
} 