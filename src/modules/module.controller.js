import { Router } from "express";
import moduleDB from "../data/moduledb.json" assert { type: "json"}
import { ModuleRepository } from "./module.repository.js";
import { ModuleService } from "./module.service.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { HttpResponse } from "../http/http.response.js";
import { role } from "../middlewares/role.middleware.js";



const moduleRepository = new ModuleRepository(moduleDB);
const moduleService = new ModuleService(moduleRepository);

const router = Router();
router.use(authenticateToken());

router.post("/", role(["instructor"]), async (req, res) => {
    const moduleData = req.body;

    try {
        const module = await moduleService.createModule(moduleData);
        res.status(201).json(new HttpResponse(module))
    } catch (error) {
        return res.status(error.code).json(new HttpResponse(null, "error", error.message))
    }
})

export default router;