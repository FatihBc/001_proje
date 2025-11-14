/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("location_research").truncate();

  await knex("location_research").insert([
    { location_id: 1, research_id: 1 }, // Pendik Hastanesi → Kalp Yetmezliği
    { location_id: 2, research_id: 2 }, // Cerrahpaşa → Parkinson
    { location_id: 3, research_id: 3 }, // Ege Üniversitesi → Kemik İyileşmesi
  ]);
};
