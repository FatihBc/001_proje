const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentResearchController");

router.get("/", controller.getDepartmentResearch);
router.post("/", controller.addDepartmentResearch);
router.delete(
  "/:department_id/:research_id",
  controller.deleteDepartmentResearch
);

module.exports = router;
