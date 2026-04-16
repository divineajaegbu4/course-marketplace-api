import UserDataValidator from "./dto/user.dto.js";

export class UserService {
  constructor(userRepository, password) {
    this.userRepository = userRepository;
    this.password = password;
  }

  async createUser(userData) {
    // Validate user data
    const validatedData = UserDataValidator.validateUserData(userData);

    if (validatedData.error) {
      console.log("validatedData", validatedData);
      throw new Error(validatedData.error.details[0].message);
    }

    // check if email already exists
    let existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // hash user password
    userData.password = await this.password.hash(userData.password);

    // // Save user to database
    
    const createdUser = structuredClone(await this.userRepository.createUser(userData))

    // delete user password from userData
    delete createdUser.password;

    return createdUser;
  }

  async findByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }
}
