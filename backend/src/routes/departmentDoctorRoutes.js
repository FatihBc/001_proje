const express = require("express");
const router = express.Router();
const departmentDoctorController = require("../controllers/departmentDoctorController");

router.get("/", departmentDoctorController.getAll);
router.post("/", departmentDoctorController.create);
router.delete("/:id", departmentDoctorController.deleteById);

module.exports = router;
