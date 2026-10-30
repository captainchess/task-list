import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createTask, getTasksByUserId, updateTask, getTaskById } from "#db/queries/tasks";

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
    const tasks = await getTasksByUserId(req.user.id);
    res.send(tasks);
});

router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);
  if (!task) return res.status(404).send("Task not found.");

  if (task.user_id !== req.user.id)
    return res
      .status(403)
      .send("You do not have permission to access this task.");

  req.task = task;
  next();
});

router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
    const {title, done} = req.body;
    const task = await updateTask(title, done, req.task.id);
    return res.send(task);
});
