import express from "express";
import { getalluser, login, signup } from "../controller/User_controller.js";

const router = express.Router();

router.get("/", getalluser);
router.post("/signup", signup);
router.post("/login", login);
export default router;
