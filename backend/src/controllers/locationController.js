const Location = require("../models/Location");

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.query();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const location = await Location.query().insert(req.body);
    res.status(201).json(location);
  } catch (err) {
    console.error("Create Location Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.query()
      .findById(req.params.id)
      .patch(req.body)
      .returning("*");
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    // Önce location kaydını bul
    const location = await Location.query().findById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Sonra sil
    await Location.query().deleteById(id);

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `Location ${location.location_id}-${location.hospital_name} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
