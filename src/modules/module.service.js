import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { NotFoundException } from "../exceptions/notfound.exception.js";
import { ModuleDataValidator } from "./dto/module.dto.js";

export class ModuleService {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
        this.countIndex = 0;
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

        moduleData.order_index = ++this.countIndex

        if(!moduleData.order_index) {
            throw new BadRequestException(`Order index is invalid: ${moduleData.order_index}`)
        }


        return await this.moduleRepository.createModule(moduleData);
    }

    async getAllModules() {
        const modules = await this.moduleRepository.getAllModules();

        if (modules.length === 0) {
            throw new NotFoundException("No modules found")
        }

        return modules;
    }

    async updateModule(id, updatedData) {
        const validatedData = await ModuleDataValidator.validateUpdateModuleData(updatedData);

        if (validatedData.error) {
            throw new BadRequestException(validatedData.error.details[0].message)
        }


        const updatedModule = await this.moduleRepository.updateModule(id, updatedData);

        if (!updatedModule) {
            throw new NotFoundException("Module not found with ID:" + id)
        }

        return updatedModule;
    }

    async deleteModule(id) {
        const isDeleted = await this.moduleRepository.deleteModule(id);

        if (!isDeleted) {
            throw new NotFoundException("Module not found with ID: " + id)
        }

        return true;
    }
}