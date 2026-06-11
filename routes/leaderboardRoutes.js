import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// GET Leaderboard
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .sort({ points: -1 });

    res.json({
      success: true,
      volunteers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;