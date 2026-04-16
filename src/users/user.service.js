import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { ConflictException } from "../exceptions/conflict.exception.js";
import { NotFoundException } from "../exceptions/notfound.exception.js";
import { ServerException } from "../exceptions/server.exception.js";
import UserDataValidator from "./dto/user.dto.js";

export class UserService {
  constructor(userRepository, password) {
    this.userRepository = userRepository;
    this.password = password;
  }

  async createUser(userData) {
    console.log("userData", userData);
    // Validate user data
    const validatedData = UserDataValidator.validateUserData(userData);

    if (validatedData.error) {
      console.log("validatedData", validatedData);
      throw new BadRequestException(validatedData.error.details[0].message);
    }

    // check if email already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new ConflictException("Email already exists")
    }

    // hash user password
    userData.password = await this.password.hash(userData.password);

    // // Save user to database

    const createdUser = structuredClone(
      await this.userRepository.createUser(userData),
    );

    // delete user password from userData
    delete createdUser.password;

    return createdUser;
  }

  async findByEmail(email) {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new NotFoundException("User not found")
    }
  }

  async findById(id) {
    const user =  await this.userRepository.findById(id)

    if(!user) {
      throw new NotFoundException("Invalid user ID:" + id)
    }

    // delete user.password
  }

  // async findByRole(role) {
  //   const user =  structuredClone(await this.userRepository.findByRole(role))
  // }

  async getAllUsers() {
    const user =  structuredClone(await this.userRepository.getAllUsers())

    if(!user) {
      throw new NotFoundException("User not found.")
    }

    user.forEach(user => delete user.password)

    return user
  }

  async updateUser(id, updatedData) {
    const validateData = UserDataValidator.validateUpdateUserData(updatedData)

    if(validateData.error) {
      throw new ServerException(validate.error.details[0].message)
    }

    if(updatedData.password) {
     updatedData.password = await this.password(updatedData.password)
    }

    const updatedUser =  structuredClone(await this.userRepository.updateUser(id, updatedData))

    if(!updatedUser) {
      throw new NotFoundException("User not found. Invalid id:" + id)
    }

    delete updatedUser.password;

    console.log("updatedUser", updatedUser);

    return updatedUser;
  }

  async deleteUser(id) {
    const deleteUser = await this.userRepository.deleteUser(id)

    if(!deleteUser) {
      throw new NotFoundException("User not found. Invalid id:" + id)
    }
  }
}
