/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("department_location").truncate();

  await knex("department_location").insert([
    { department_id: 1, location_id: 1 }, // Kardiyoloji → Pendik
    { department_id: 2, location_id: 2 }, // Nöroloji → Cerrahpaşa
    { department_id: 3, location_id: 3 }, // Ortopedi → Ege Üniversitesi
    { department_id: 1, location_id: 2 }, // Kardiyoloji → Cerrahpaşa (örnek çoklu ilişki)
  ]);
};
