exports.seed = async function (knex) {
  await knex("department_doctor").delete();
  await knex("department_doctor").insert([
    { department_id: 1, doctor_id: 1 },
    { department_id: 1, doctor_id: 2 },
    { department_id: 2, doctor_id: 4 },
    { department_id: 2, doctor_id: 5 },
    { department_id: 3, doctor_id: 7 },
    { department_id: 3, doctor_id: 9 },
  ]);
};
