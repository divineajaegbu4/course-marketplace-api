import { Identifier } from "../utils/identifier.js";

export class ModuleRepository {
  constructor(moduleDB) {
    this.moduleDB = moduleDB;
  }

  async createModule(moduleData) {
    moduleData.id = Identifier.generateId();

    this.moduleDB.push(moduleData);

    return moduleData;
  }

  async getAllModules(queryFilter = {}) {
    const { title, order_index } = queryFilter;

    let filteredModules = this.moduleDB;

    if (title) {
      filteredModules = filteredModules.filter(
        (module) => module.title === title,
      );
    }

    // if (order_index) {
    //   filteredModules = filteredModules.filter(
    //     (module) => module.order_index === order_index,
    //   );
    // }

    // if (search) {
    //   filteredModules = filteredModules.filter(
    //     (module) =>
    //       module.title.toLowerCase().includes(search.toLowerCase()) ||
    //       module.order_index.toString().includes(search.toString())
    //   );
    // }

    return filteredModules;
  }

  async getModuleById(id) {
    return this.moduleDB.find((module) => module.id === id);
  }

  async getModuleByTitle(title) {
    return this.moduleDB.find((module) => module.title === title);
  }

  async updateModule(id, updatedData) {
    const moduleIndex = this.moduleDB.findIndex((module) => module.id === id);

    if (moduleIndex !== -1) {
      this.moduleDB[moduleIndex] = {
        ...this.moduleDB[moduleIndex],
        ...updatedData,
      };
      return this.moduleDB[moduleIndex];
    }

    return null;
  }

  async deleteModule(id) {
    const moduleIndex = this.moduleDB.findIndex((module) => module.id === id);

    if (moduleIndex !== -1) {
      this.moduleDB.splice(moduleIndex, 1);

      return true;
    }

    return false;
  }
}
