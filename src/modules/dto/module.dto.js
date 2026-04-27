import Joi from "joi";

export class ModuleDataValidator {
    static validateMouduleData(data) {
        const moduleSchema = Joi.object({
            title: Joi.string().min(5).max(100).required(),
            content_url: Joi.string().uri().required(),
            course_id: Joi.string().required(),
            order_index: Joi.number().integer().min(1)
        })

        return moduleSchema.validate(data)
    }

    static validateUpdateModuleData(data) {
        const moduleSchema = Joi.object({
            title: Joi.string().min(5).max(100),
            content_url: Joi.string().uri().valid("youtube.com")
        })

        return moduleSchema.validate(data)
    }
}
        
    
