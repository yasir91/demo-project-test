const Board = require("../models/board.model");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({ name: req.body.name, user: req.user.id });
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id, isDeleted: false });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.renameBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.softDeleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true },
      { new: true }
    );
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.json({ message: "Board deleted", board });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.restoreBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: false },
      { new: true }
    );
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.json({ message: "Board restored", board });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
