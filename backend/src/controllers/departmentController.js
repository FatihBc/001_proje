const Department = require("../models/Department");

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.query();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.query().insert(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.query()
      .findById(req.params.id)
      .patch(req.body);
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Önce departmanı bul
    const department = await Department.query().findById(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Sonra sil
    await Department.query().deleteById(id);

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `Department ${department.department_id}-${department.name} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
