const express = require("express");
const router = express.Router();
const researchController = require("../controllers/researchController");

router.get("/", researchController.getResearches);
router.post("/", researchController.createResearch);
router.put("/:id", researchController.updateResearch);
router.delete("/:id", researchController.deleteResearch);

module.exports = router;
