import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { ModuleDataValidator } from "./dto/module.dto.js";

export class ModuleService {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async createModule(moduleData) {
        const validatedModule = ModuleDataValidator.validateMouduleData(moduleData);

        if (validatedModule.error) {
            throw new BadRequestException(validatedModule.error.details[0].message)
        }

        const existingModule = await this.moduleRepository.getModuleByTitle(moduleData.title);

        if (existingModule) {
            throw new ConflictException("Module with this title already exists")
        }


        return await this.moduleRepository.createModule(moduleData);
    }
}