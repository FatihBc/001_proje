const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  try {
    const { department_id, location_id } = req.query;
    let query = Doctor.query().withGraphFetched("[department, location]");

    if (department_id) query = query.where("department_id", department_id);
    if (location_id) query = query.where("location_id", location_id);

    const doctors = await query;
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.query().insert(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.query()
      .findById(req.params.id)
      .patch(req.body)
      .returning("*");
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Önce doktor kaydını bul
    const doctor = await Doctor.query().findById(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Sonra sil
    await Doctor.query().deleteById(id);

    // Silinen kaydın bilgilerini dön
    res.json({
      message: `Doctor ${doctor.doctor_id}-${doctor.name} ${doctor.surname} deleted`,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
