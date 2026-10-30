import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createTask } from "#db/queries/tasks";

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = await req.body;
  const task = await createTask(title, done, req.user.id);
});
