import { Router, Request, Response } from "express";
import { userController, commonController } from "../controllers";

const router = Router();
const {
  getUserById,
  getUserAutoSuggestion,
  createUser,
  updateUser,
  deleteUser,
} = userController;
const { handleMethodNotAllowed } = commonController;

router.get("/autoSuggests", getUserAutoSuggestion);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.all("/", handleMethodNotAllowed);

export default router;
