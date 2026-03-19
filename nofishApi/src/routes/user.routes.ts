import { Router } from "express";
import { getDiscovery, swipe } from "../controllers/user.controller";

const router = Router();

// Routes
router.get("/discovery", getDiscovery);
router.post("/swipe", swipe);

export default router;