import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { NotFoundException } from "../exceptions/notfound.exception.js";

export class AuthService {
  constructor(userService, authToken, password) {
    this.userService = userService;
    this.authToken = authToken;
    this.password = password;
  }

  async signUp(signUpData) {
    let user;

    try {
      user = await this.userService.createUser(signUpData);
    } catch (error) {
      throw new BadRequestException(`Signup failed: ${error.message}`);
    }

    user.student_token = this.authToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });


    return user;
  }

  async login(loginData) {
    console.log("login data:", loginData);
    //  const user = await this.userService.findByEmail(loginData.email)

    const user = await this.userService.findByEmail(loginData.email);

    console.log("user", user);

    console.log("login data2:", loginData);


  if (!user) {
      throw new NotFoundException("Invalid email or password");
    }

    const isPassword = await this.password.verify(
      loginData.password,
      user.password,
    );

    console.log(user.password);

    if (!isPassword) {
      throw new NotFoundException("Invalid email or password");
    }

    user.student_token = this.authToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    console.log(user);
    delete user.password;
    return user;
  }
}
