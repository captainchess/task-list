import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createTask, getTasksById } from "#db/queries/tasks";

router.use(requireUser);

router.post(
  "/",
  requireBody(["title", "done"]),
  async (req, res) => {
    const { title, done } = await req.body;
    const task = await createTask(title, done, req.user.id);
    res.status(201).send(task);
  },
);

router.get("/", async (req, res) => {
    const tasks = await getTasksById(req.user.id);
    res.send(tasks);
});

router.put("/", requireBody(["title", "done"]), async (req, res) => {
    const task = await updateTask(req.user.id);
    
});
