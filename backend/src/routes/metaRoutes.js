const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

// Departman listesini getir
router.get("/departments", async (req, res) => {
  try {
    const departments = await knex("department") // ⚠️ tablo adı migration ile uyumlu olmalı
      .select("department_id", "name", "description");
    res.json(departments);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Lokasyon listesini getir
router.get("/locations", async (req, res) => {
  try {
    const locations = await knex("location") // ⚠️ tablo adı migration ile uyumlu olmalı
      .select("location_id", "hospital_name", "city", "address");
    res.json(locations);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
