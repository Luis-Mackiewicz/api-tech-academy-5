import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  UserController.getProfile;
});
router.put("/profile", authMiddleware, (req, res) => {
  UserController.updateProfile;
});
router.delete("/profile", authMiddleware, (req, res) => {
  UserController.deleteProfile;
});

export default router;
