const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorResearchController");

router.get("/", controller.getDoctorResearch);
router.post("/", controller.addDoctorResearch);
router.delete("/:doctor_id/:research_id", controller.deleteDoctorResearch);

module.exports = router;
