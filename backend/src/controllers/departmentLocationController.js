const DepartmentLocation = require("../models/DepartmentLocation");

exports.getDepartmentLocations = async (req, res) => {
  try {
    const data = await DepartmentLocation.query();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDepartmentLocation = async (req, res) => {
  try {
    const relation = await DepartmentLocation.query().insert(req.body);
    res.status(201).json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDepartmentLocation = async (req, res) => {
  try {
    const { department_id, location_id } = req.params;

    // Önce kaydı bul
    const record = await DepartmentLocation.query().findOne({
      department_id,
      location_id,
    });

    if (!record) {
      return res.status(404).json({ error: "DepartmentLocation not found" });
    }

    // Sonra sil
    await DepartmentLocation.query()
      .delete()
      .where({ department_id, location_id });

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `DepartmentLocation ${record.department_id}-${record.location_id} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
