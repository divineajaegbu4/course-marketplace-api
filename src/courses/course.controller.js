import { Router } from "express";
import courseDB from "../data/coursedb.json" assert { type: "json" };
import userDB from "../data/userdb.json" assert { type: "json" };
import { CourseRepository } from "./course.repository.js";
import { UserRepository } from "../users/user.repository.js";
import { CourseService } from "./course.service.js";
import { UserService } from "../users/user.service.js";
import { role } from "../middlewares/role.middleware.js";
import { authenticateToken} from "../middlewares/authenticateToken.middleware.js";
import { HttpResponse } from "../http/http.response.js";

const router = Router();

router.use(authenticateToken());

const courseRepository = new CourseRepository(courseDB);
const userRepository = new UserRepository(userDB);

const userService = new UserService(userRepository);
const courseService = new CourseService(courseRepository, userRepository);



router.post("/", role(["instructor"]), async (req, res) => {
  const courseData = req.body;
  const userData = req.user;

  try {
    const createCourse = await courseService.createCourse(courseData, userData);
    res.status(201).json(new HttpResponse(createCourse));
  } catch (error) {
    return res
      .status(error.code)
      .json(new HttpResponse(null, "error", error.message));
  }
});

router.get("/",  role(["instructor", "student"]), async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(new HttpResponse(courses));
  } catch (error) {
    return res
      .status(error.code)
      .json(new HttpResponse(null, "error", error.message));
  }
});



export default router;
