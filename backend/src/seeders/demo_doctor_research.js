/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("doctor_research").truncate();

  await knex("doctor_research").insert([
    { doctor_id: 1, research_id: 1 }, // Ahmet → Kalp Yetmezliği
    { doctor_id: 2, research_id: 2 }, // Ayşe → Parkinson
    { doctor_id: 1, research_id: 3 }, // Ahmet → Kemik İyileşmesi
  ]);
};
