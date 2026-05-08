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

  async getAllUsers(queryFilter = {}) {
    const { role, fullname, email, search } = queryFilter;

    let filteredUsers = this.users;

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
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
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  async findByRole(role) {
    return this.users.find((user) => user.role === role) || null;
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
