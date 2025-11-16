const Research = require("../models/Research");

exports.getResearches = async (req, res) => {
  try {
    const researches = await Research.query().withGraphFetched(
      "[doctors, departments, locations]"
    );
    res.json(researches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createResearch = async (req, res) => {
  try {
    const research = await Research.query().insert(req.body);
    res.status(201).json(research);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateResearch = async (req, res) => {
  try {
    const research = await Research.query()
      .findById(req.params.id)
      .patch(req.body)
      .returning("*");
    res.json(research);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;

    // Önce research kaydını bul
    const research = await Research.query().findById(id);

    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }

    // Sonra sil
    await Research.query().deleteById(id);

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `Research ${research.research_id}-${research.title} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
