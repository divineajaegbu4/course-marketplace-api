import express from "express";
import userController from "./users/user.controller.js";
import authController from "./auth/auth.controller.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/users", userController);
app.use("/auth", authController);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
