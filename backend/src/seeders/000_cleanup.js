exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE department_department_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE location_location_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE doctor_doctor_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE research_research_id_seq RESTART WITH 1");
};
