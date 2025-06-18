const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createBoard,
  getBoards,
  renameBoard,
  softDeleteBoard,
  restoreBoard
} = require("../controllers/board.controller");

router.use(auth); // protect all board routes

router.post("/", createBoard);
router.get("/", getBoards);
router.put("/:id", renameBoard);
router.delete("/:id", softDeleteBoard);
router.patch("/:id/restore", restoreBoard);

router.get("/debug-token", (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
