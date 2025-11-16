/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("doctor_research").truncate();

  await knex("doctor_research").insert([
    { doctor_id: 1, research_id: 1 },
    { doctor_id: 2, research_id: 4 },
    { doctor_id: 3, research_id: 9 },
    { doctor_id: 4, research_id: 2 },
    { doctor_id: 5, research_id: 5 },
    { doctor_id: 6, research_id: 6 },
    { doctor_id: 7, research_id: 3 },
    { doctor_id: 8, research_id: 8 },
  ]);
};
