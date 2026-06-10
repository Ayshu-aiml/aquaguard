import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// Register Volunteer
router.post("/", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);

    await volunteer.save();

    res.status(201).json({
      success: true,
      message: "Volunteer Registered Successfully",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      volunteers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;