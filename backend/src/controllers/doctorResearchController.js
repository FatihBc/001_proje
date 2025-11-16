const DoctorResearch = require("../models/DoctorResearch");

exports.getDoctorResearch = async (req, res) => {
  try {
    const data = await DoctorResearch.query();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDoctorResearch = async (req, res) => {
  try {
    const relation = await DoctorResearch.query().insert(req.body);
    res.status(201).json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctorResearch = async (req, res) => {
  try {
    const { doctor_id, research_id } = req.params;

    // Önce kaydı bul
    const record = await DoctorResearch.query().findOne({
      doctor_id,
      research_id,
    });

    if (!record) {
      return res.status(404).json({ error: "DoctorResearch not found" });
    }

    // Sonra sil
    await DoctorResearch.query().delete().where({ doctor_id, research_id });

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `DoctorResearch ${record.doctor_id}-${record.research_id} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
