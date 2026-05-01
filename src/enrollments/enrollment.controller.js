import { Router } from "express";
import enrollmentDB from "../data/enrollmentdb.json" assert { type: "json" };
import { EnrollmentRepository } from "./enrollment.repository.js";
import { EnrollmentService } from "./enrollment.service.js";
import { role } from "../middlewares/role.middleware.js";
import { HttpResponse } from "../http/http.response.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";

const router = Router();

router.use(authenticateToken());

const enrollmentRepository = new EnrollmentRepository(enrollmentDB);
const enrollmentService = new EnrollmentService(enrollmentRepository);

router.post("/", role(["instructor"]), async (req, res) => {
  const enrollmentData = req.body;

  try {
    const enrollment = await enrollmentService.createEnrollment(enrollmentData);
    res.status(201).json(new HttpResponse(enrollment));
  } catch (error) {
    return res
      .status(error.code)
      .json(new HttpResponse(null, "error", error.message));
  }
});

router.get(
  "/my-learning",
  role(["student", "instructor"]),
  async (req, res) => {
    try {
      const enrollments = await enrollmentService.getAllEnrollments();
      res.status(200).json(new HttpResponse(enrollments));
    } catch (error) {
      return res
        .status(error.code)
        .json(new HttpResponse(null, "error", error.message));
    }
  },
);

router.delete("/:id", role(["instructor"]), async (req, res) => {
    const { id } = req.params;

    try {
        await enrollmentService.deleteEnrollment(id);
        res.status(204).send()
    } catch (error) {
        return res
            .status(error.code)
            .json(new HttpResponse(null, "error", error.message));
    }
})

export default router;
