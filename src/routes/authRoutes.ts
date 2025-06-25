import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/register", (req, res) => {
  AuthController.register;
});
router.post("/login", (req, res) => {
  AuthController.login;
});

export default router;
