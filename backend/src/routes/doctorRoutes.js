const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

// Doktorları departman + lokasyona göre filtrele
router.get("/doctors/filter", async (req, res) => {
  try {
    const { department_id, location_id } = req.query;

    let query = knex("doctor") // ⚠️ tablo adı migration ile uyumlu olmalı (doctor vs doctors)
      .select(
        "doctor.doctor_id",
        "doctor.name",
        "doctor.surname",
        "doctor.birth_date",
        "department.name as department_name",
        "location.hospital_name as location_name",
        "location.city"
      )
      .leftJoin(
        "department",
        "doctor.department_id",
        "department.department_id"
      )
      .leftJoin("location", "doctor.location_id", "location.location_id");

    if (department_id) {
      query = query.where("doctor.department_id", department_id);
    }
    if (location_id) {
      query = query.where("doctor.location_id", location_id);
    }

    const doctors = await query;
    res.json(doctors);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
