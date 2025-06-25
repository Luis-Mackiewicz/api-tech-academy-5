import { Router } from "express";
import { MemberController } from "../controllers/MemberController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get(
  "/project/:projectId",
  authMiddleware,
  MemberController.listByProject
);
router.post("/project/:projectId", authMiddleware, MemberController.addMember);
router.patch("/:memberId", authMiddleware, MemberController.updateRole);
router.delete("/:memberId", authMiddleware, MemberController.removeMember);

export default router;
