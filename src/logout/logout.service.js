import { NotFoundException } from "../exceptions/notfound.exception.js";

export class LogoutService {
    constructor(userService) {
        this.userService = userService;
    }

    async logout(userData) {
        const user = await this.userService.findById(userData.id);

        console.log("logout", user);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return await this.userService.deleteUser(user.id)

    }
}