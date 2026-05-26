require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getOracleData } = require("./oracle");

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// =====================
// MAIN ORACLE API
// =====================
app.get("/api/oracle", async (req, res) => {
  try {
    const data = await getOracleData();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// =====================
// MANUAL UPDATE TRIGGER
// =====================
app.post("/api/update", async (req, res) => {
  try {
    const data = await getOracleData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Oracle API running on port ${PORT}`);
});