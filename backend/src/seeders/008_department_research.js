/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("department_research").delete();

  await knex("department_research").insert([
    { department_id: 1, research_id: 1 },
    { department_id: 1, research_id: 4 },
    { department_id: 1, research_id: 7 },
    { department_id: 1, research_id: 10 },
    { department_id: 2, research_id: 2 },
    { department_id: 2, research_id: 5 },
    { department_id: 2, research_id: 8 },
    { department_id: 3, research_id: 3 },
    { department_id: 3, research_id: 6 },
    { department_id: 3, research_id: 9 },
  ]);
};
