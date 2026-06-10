import express from "express";
import Volunteer from "../models/Volunteer.js";
import Report from "../models/report.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const volunteerCount =
      await Volunteer.countDocuments();

    const reportCount =
      await Report.countDocuments();

    res.json({
      success: true,
      volunteers: volunteerCount,
      reports: reportCount,
      wasteRemoved: 5000,
      cleanupDrives: 45
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

export default router;