import { Router } from "express";
import { groupController, commonController } from "../controllers";

const router = Router();

const {
  getGroupById,
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup,
} = groupController;
const { handleMethodNotAllowed } = commonController;

router.get("/", getAllGroups);
router.get("/:id", getGroupById);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);
router.post("/addUsersToGroup", addUsersToGroup);
router.all("/", handleMethodNotAllowed);

export default router;
