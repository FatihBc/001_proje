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
      name: "Selim",
      surname: "Demir",
      birth_date: "1985-09-20",
      department_id: 1,
      location_id: 2,
    },
    {
      name: "Mehmet",
      surname: "Doğulu",
      birth_date: "1980-05-12",
      department_id: 1,
      location_id: 3,
    },
    {
      name: "Osman",
      surname: "Sönmez",
      birth_date: "1980-05-12",
      department_id: 2,
      location_id: 1,
    },
    {
      name: "Elif",
      surname: "Keskin",
      birth_date: "1985-09-20",
      department_id: 2,
      location_id: 2,
    },
    {
      name: "Semih",
      surname: "Topçu",
      birth_date: "1980-05-12",
      department_id: 2,
      location_id: 3,
    },
    {
      name: "Sunrullah",
      surname: "Deniz",
      birth_date: "1980-05-12",
      department_id: 3,
      location_id: 1,
    },
    {
      name: "Narin",
      surname: "Yeşim",
      birth_date: "1985-09-20",
      department_id: 3,
      location_id: 2,
    },
    {
      name: "Recep",
      surname: "Ayık",
      birth_date: "1980-05-12",
      department_id: 3,
      location_id: 3,
    },
  ]);
};
