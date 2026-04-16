import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { ConflictException } from "../exceptions/conflict.exception.js";
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
    return await this.userRepository.findByEmail(email);
  }
}
