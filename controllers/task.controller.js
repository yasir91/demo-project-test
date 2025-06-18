const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      boardId: req.body.boardId,
      title: req.body.title
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId, deleted: false });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updates = { status };

    if (status === "in-progress") {
      updates.startedAt = new Date();
    }

    if (status === "done") {
      updates.completedAt = new Date();

      const task = await Task.findById(req.params.id);
      if (task && task.startedAt) {
        const duration = Math.round((new Date() - task.startedAt) / 60000); // minutes
        updates.duration = duration;
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json({ message: "Task soft-deleted", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    res.json({ message: "Task restored", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
