/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("location_research").truncate();

  await knex("location_research").insert([
    { location_id: 1, research_id: 1 },
    { location_id: 1, research_id: 2 },
    { location_id: 2, research_id: 4 },
    { location_id: 2, research_id: 5 },
    { location_id: 3, research_id: 3 },
    { location_id: 3, research_id: 6 },
    { location_id: 3, research_id: 9 },
  ]);
};
