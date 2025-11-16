const DepartmentResearch = require("../models/DepartmentResearch");

exports.getDepartmentResearch = async (req, res) => {
  try {
    const data = await DepartmentResearch.query();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDepartmentResearch = async (req, res) => {
  try {
    const relation = await DepartmentResearch.query().insert(req.body);
    res.status(201).json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDepartmentResearch = async (req, res) => {
  try {
    const { department_id, research_id } = req.params;

    // Önce kaydı bul
    const record = await DepartmentResearch.query().findOne({
      department_id,
      research_id,
    });

    if (!record) {
      return res.status(404).json({ error: "DepartmentResearch not found" });
    }

    // Sonra sil
    await DepartmentResearch.query()
      .delete()
      .where({ department_id, research_id });

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `DepartmentResearch ${record.department_id}-${record.research_id} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
