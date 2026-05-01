import express from "express";
import userController from "./users/user.controller.js";
import authController from "./auth/auth.controller.js";
import courseController from "./courses/course.controller.js"
import moduleController from "./modules/module.controller.js"
import enrollmentController from "./enrollments/enrollment.controller.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());


app.use("/auth", authController);
app.use("/users", userController);
app.use("/courses", courseController)
app.use("/modules", moduleController)
app.use("/enrollments", enrollmentController)

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});

console.log("I am still alive")
