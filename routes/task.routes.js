const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasksByBoard,
  updateStatus,
  softDeleteTask,
  restoreTask
} = require("../controllers/task.controller");

router.post("/", createTask);                       // Create new task
router.get("/board/:boardId", getTasksByBoard);     // Get tasks by board
router.put("/:id/status", updateStatus);            // Update status (triggers timestamps/duration)
router.delete("/:id", softDeleteTask);              // Soft delete task
router.patch("/:id/restore", restoreTask);          // Restore task

module.exports = router;
