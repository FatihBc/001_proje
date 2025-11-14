/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("doctor").truncate();

  await knex("doctor").insert([
    {
      name: "Ahmet",
      surname: "Yılmaz",
      birth_date: "1980-05-12",
      department_id: 1,
      location_id: 1,
    },
    {
      name: "Ayşe",
      surname: "Demir",
      birth_date: "1985-09-20",
      department_id: 2,
      location_id: 1,
    },
  ]);
};
