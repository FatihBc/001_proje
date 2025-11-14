const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

// Tüm araştırmaları listele + filtreleme
router.get("/research", async (req, res) => {
  try {
    const { department_id, location_id, doctor_id } = req.query;

    let query = knex("research") // ⚠️ tablo adı migration ile uyumlu olmalı
      .select(
        "research.research_id",
        "research.title",
        "research.field",
        "research.start_date",
        "research.end_date",
        "research.description"
      );

    if (department_id) {
      query = query
        .join(
          "department_research",
          "research.research_id",
          "department_research.research_id"
        )
        .where("department_research.department_id", department_id);
    }

    if (location_id) {
      query = query
        .join(
          "location_research",
          "research.research_id",
          "location_research.research_id"
        )
        .where("location_research.location_id", location_id);
    }

    if (doctor_id) {
      query = query
        .join(
          "doctor_research",
          "research.research_id",
          "doctor_research.research_id"
        )
        .where("doctor_research.doctor_id", doctor_id);
    }

    const researches = await query;
    res.json(researches);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
