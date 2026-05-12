import { Finder } from "../utils/finder.js";
import { Identifier } from "../utils/identifier.js";
import { QueryFilter } from "../utils/queryFilter.js";

export class UserRepository {
  constructor(userDB = []) {
    this.users = userDB;
  }

  async createUser(userData) {
    userData.id = Identifier.generateId();

    this.users.push(userData);

    return userData;
  }

  async getAllUsers(queryFilter = {}) {
    const { role, fullname, email, search } = queryFilter;

    let filteredUsers = this.users;

    if (role) {
      filteredUsers = await QueryFilter.filter(filteredUsers, "role", role)
    }

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fullname.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filteredUsers;
  }



  async findById(id) {
    return await Finder.findItem(this.users, "id", id);
  }

  async findByEmail(email) {
    return await Finder.findItem(this.users, "email", email);
  }

  async findByRole(role) {
    return await Finder.findItem(this.users, "role", role);
  }

  async updateUser(id, updatedData) {
    const index = await Finder.findIndex(this.users, "id", id);

    if (index === -1) {
      return null;
    }

    this.users[index] = { ...this.users[index], ...updatedData };

    return this.users[index];
  }

  async deleteUser(id) {
    const index = await Finder.findIndex(this.users, "id", id);

    if (index === -1) {
      return "User is not found";
    }

    this.users.splice(index, 1);

    return true;
  }
}
