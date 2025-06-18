const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth.middleware"); // ✅ Add this

const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes");

const app = express();
app.use(cors());
app.use(express.json());

// ❌ Do NOT apply auth middleware globally

app.use("/api/auth", authRoutes);

// Later use auth like:
app.use("/api/boards", auth, boardRoutes);

module.exports = app;
