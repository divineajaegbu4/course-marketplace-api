import { Router } from "express";
import userDB from "../data/userdb.json" assert { type: "json" };
import { UserRepository } from "../users/user.repository.js";
import { Password } from "../security/password.js";

import { UserService } from "../users/user.service.js";
import { AuthService } from "./auth.service.js";
import { AuthToken } from "../security/auth.token.js";

const router = Router();

const userRepository = new UserRepository(userDB);

const password = new Password();

const userService = new UserService(userRepository, password);

const authService = new AuthService(userService, AuthToken, password);

router.post("/signup", async (req, res) => {
  const userData = req.body;

  try {
    const user = await authService.signUp(userData);

    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const loginData = req.body;

  try {
    const user = await authService.login(loginData);
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
