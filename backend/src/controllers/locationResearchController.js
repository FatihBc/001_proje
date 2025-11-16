const LocationResearch = require("../models/LocationResearch");

exports.getLocationResearch = async (req, res) => {
  try {
    const data = await LocationResearch.query();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addLocationResearch = async (req, res) => {
  try {
    const relation = await LocationResearch.query().insert(req.body);
    res.status(201).json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLocationResearch = async (req, res) => {
  try {
    const { location_id, research_id } = req.params;

    // Önce kaydı bul
    const record = await LocationResearch.query().findOne({
      location_id,
      research_id,
    });

    if (!record) {
      return res.status(404).json({ error: "LocationResearch not found" });
    }

    // Sonra sil
    await LocationResearch.query().delete().where({ location_id, research_id });

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `LocationResearch ${record.location_id}-${record.research_id} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
