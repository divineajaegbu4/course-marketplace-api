import { Router } from "express";
import userDB from "../data/userdb.json" assert { type: 'json' };
import { UserRepository } from "./user.repository.js";
import { Password } from "../security/password.js";
import { UserService } from "./user.service.js";

const router = Router()


const userRepository = new UserRepository(userDB)

const password = new Password()

const userService = new UserService(userRepository, password);



export default router
