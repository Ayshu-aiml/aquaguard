
import express from "express";
import Report from "../models/Report.js";
import Volunteer from "../models/volunteer.js";

const router = express.Router();

/* =========================
   SUBMIT REPORT
========================= */

router.post("/", async (req, res) => {

  try {

    const {
      location,
      pollutionType,
      description,
      volunteerEmail,
      latitude,
      longitude,
      image
    } = req.body;

    console.log(req.body);

    const report = new Report({
      location,
      pollutionType,
      description,
      volunteerEmail,
      latitude,
      longitude,
      image
    });

    await report.save();

    // Find Volunteer

    const volunteer = await Volunteer.findOne({
      email: volunteerEmail
    });

    if (volunteer) {

      volunteer.points += 10;

      // Badge Logic

      if (volunteer.points >= 100) {

        volunteer.badge = "Gold";

      }
      else if (volunteer.points >= 50) {

        volunteer.badge = "Silver";

      }
      else {

        volunteer.badge = "Bronze";

      }

      await volunteer.save();

    }

    res.status(201).json({
      success: true,
      message: "Report Submitted Successfully",
      report
    });

  }
  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

/* =========================
   GET ALL REPORTS
========================= */

router.get("/", async (req, res) => {

  try {

    const reports =
      await Report.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reports
    });

  }
  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

export default router;
