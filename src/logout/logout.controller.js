import { Router } from "express";
import userDB from "../data/userdb.json" assert { type: "json"}
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { UserRepository } from "../users/user.repository.js";
import { Password } from "../security/password.js";
import { UserService } from "../users/user.service.js";
import { LogoutService } from "./logout.service.js";

const router = Router();

router.use(authenticateToken());

const userRepository = new UserRepository(userDB);

const password = new Password();

const userService = new UserService(userRepository, password);

const logoutService = new LogoutService(userService)

router.get("/", async (req, res) => {
    const userData = req.user;

    try {
        const logout = await logoutService.logout(userData);
        res.status(200).json({ message: "Logout successful"})
    } catch (error) {
        return res.status(error.code).json({message: error.message})
    }
})

export default router;