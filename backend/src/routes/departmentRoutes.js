const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// GET all departments
router.get("/", departmentController.getDepartments);

// POST new department
router.post("/", departmentController.createDepartment);

// PUT update department by id
router.put("/:id", departmentController.updateDepartment);

// DELETE department by id
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
