import { Finder } from "../utils/finder.js";
import { Identifier } from "../utils/identifier.js";
import { QueryFilter } from "../utils/queryFilter.js";

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
      filteredModules = await QueryFilter.filter(filteredModules, "title", title)
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
    return await Finder.findItem(this.moduleDB, "id", id)
  }

  async getModuleByTitle(title) {
    return await Finder.findItem(this.moduleDB, "title", title);
  }

  async updateModule(id, updatedData) {
    const moduleIndex = await Finder.findIndex(this.moduleDB, "id", id);

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
    const moduleIndex = await Finder.findIndex(this.moduleDB, "id", id);

    if (moduleIndex !== -1) {
      this.moduleDB.splice(moduleIndex, 1);

      return true;
    }

    return false;
  }
}
