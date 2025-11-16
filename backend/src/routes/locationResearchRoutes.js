const express = require("express");
const router = express.Router();
const controller = require("../controllers/locationResearchController");

router.get("/", controller.getLocationResearch);
router.post("/", controller.addLocationResearch);
router.delete("/:location_id/:research_id", controller.deleteLocationResearch);

module.exports = router;
