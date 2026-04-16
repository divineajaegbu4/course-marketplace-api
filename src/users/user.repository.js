import { Identifier } from "../utils/identifier.js";

export class UserRepository {
  constructor(userDB = []) {
    this.users = userDB;
  }

  async createUser(userData) {
    userData.id = Identifier.generateId();

    this.users.push(userData);

    return userData;
  }

  async getAllUsers() {
    return this.users;
  }

  async findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  async findByRole(role) {
    return this.users.find((user) => user.role === role) || null;
  }

  async findByPassword(password) {
    return this.users.find(user => user.password === password) || null;
  }

  async updateUser(id, updatedData) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return "User is not found";
    }

    this.users[index] = { ...this.users[index], ...updatedData };

    return this.users[index];
  }

  async deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return "User is not found";
    }

    this.users.splice(index, 1);

    return true;
  }
}
