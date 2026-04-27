import { Router } from "express";
import moduleDB from "../data/moduledb.json" assert { type: "json"}
import { ModuleRepository } from "./dto/module.repository.js";
import { ModuleService } from "./module.service.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { HttpResponse } from "../http/http.response.js";
import { role } from "../middlewares/role.middleware.js";
import { BadRequestException } from "../exceptions/badrequest.exception.js";



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

router.get("/", role(["student", "instructor"]), async (req, res) => {
    try {
        const modules = await moduleService.getAllModules();
        res.status(200).json(new HttpResponse(modules))
    } catch (error) {
        return res.status(error.code).json(new HttpResponse(null, "error", error.message))
    }
})

router.patch("/:id", role(["student", "instructor"]), async (req, res) => {
    const updatedData = req.body;
    const { id } = req.params

    try {
        const updatedModule = await moduleService.updateModule(id, updatedData);
        res.status(200).json(new HttpResponse(updatedModule))
    } catch (error) {
        return res.status(error.code).json(new HttpResponse(null, "error", error.message))
    }

})


router.delete("/:id", role(["instructor"]), async (req, res) => {
    const { id } = req.params;


    try {
        await moduleService.deleteModule(id);
        res.status(200).json(new HttpResponse(null, "success", "Module deleted successfully"))
    } catch (error) {
        return res.status(error.code).json(new HttpResponse(null, "error", error.message))
    }
})
export default router;