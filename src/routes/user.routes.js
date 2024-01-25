import { Router } from "express";
import { userControllers } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(userControllers.registerUser);

export default router;
