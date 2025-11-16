const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentLocationController");

router.get("/", controller.getDepartmentLocations);
router.post("/", controller.addDepartmentLocation);
router.delete(
  "/:department_id/:location_id",
  controller.deleteDepartmentLocation
);

module.exports = router;
