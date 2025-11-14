/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("department_research").truncate();

  await knex("department_research").insert([
    { department_id: 1, research_id: 1 }, // Kardiyoloji → Kalp Yetmezliği
    { department_id: 2, research_id: 2 }, // Nöroloji → Parkinson
    { department_id: 3, research_id: 3 }, // Ortopedi → Kemik İyileşmesi
  ]);
};
