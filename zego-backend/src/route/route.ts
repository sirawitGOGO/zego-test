import { Router } from "express";
import controller from "../controller/controller";

const router = Router();

router.post("/appliedJob", controller.appliedJob);

export default router;