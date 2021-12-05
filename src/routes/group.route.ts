import { Router, Request, Response } from "express";
import { groupController } from "../controllers/group.controller";
import { commonController } from "../controllers/common.controller";

const router = Router();

const { getGroupById, getAllGroups } = groupController;
const { handleMethodNotAllowed } = commonController;

router.get("/", getAllGroups);
router.get("/:id", getGroupById);
router.all("/", handleMethodNotAllowed);

export default router;
