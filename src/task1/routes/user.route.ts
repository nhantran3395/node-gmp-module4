import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();
const { getUserById, getUserAutoSuggests, createUser, updateUser, deleteUser } =
  userController;

router.get("/autoSuggests", getUserAutoSuggests);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
