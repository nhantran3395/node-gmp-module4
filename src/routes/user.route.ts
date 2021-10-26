import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();
const {
  getUserById,
  getUserAutoSuggestion,
  createUser,
  updateUser,
  deleteUser,
} = userController;

router.get("/autoSuggests", getUserAutoSuggestion);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
