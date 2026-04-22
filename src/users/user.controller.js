import { Router } from "express";
import userDB from "../data/userdb.json" assert { type: 'json' };
import { UserRepository } from "./user.repository.js";
import { Password } from "../security/password.js";
import { UserService } from "./user.service.js";
import { TokenDecoderMiddleware } from "../middlewares/token.decoder.middleware.js";
import { role } from "../middlewares/role.middleware.js";

const router = Router()

router.use(TokenDecoderMiddleware())


const userRepository = new UserRepository(userDB)

const password = new Password()

const userService = new UserService(userRepository, password);



export default router

router.get("/me", role(["instructor"]), async(req, res) => {
    try {
        const user = await userService.getAllUsers()
        res.status(200).json(user)
    } catch (error) {
        return res.status(error.status).json(error.message)
        
    }
})

router.patch("/me", role(["student"]), async (req, res) => {
    const updatedData = req.body;
    const {id} = req.user;

    try {
        const updatedUser = await userService.updateUser(id, updatedData)
        res.status(200).json(updatedUser)
    } catch (error) {
       return res.status(error.status).json(error.message)
    }
})

router.delete("/me", role(["instructor"]), async (req, res) => {
    const {id} = req.user;

    try {
        await userService.deleteUser(id)
        res.status(204).send()
    } catch (error) {
        return res.status(error.status).json(error.message)
    }
})
