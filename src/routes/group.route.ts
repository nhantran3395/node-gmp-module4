import { Router } from "express";
import { groupController } from "../controllers/group.controller";
import { commonController } from "../controllers/common.controller";

const router = Router();

const { getGroupById, getAllGroups, createGroup, deleteGroup } =
  groupController;
const { handleMethodNotAllowed } = commonController;

router.get("/", getAllGroups);
router.get("/:id", getGroupById);
router.post("/", createGroup);
router.delete("/:id", deleteGroup);
router.all("/", handleMethodNotAllowed);

export default router;
