exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE doctor CASCADE");
  await knex.raw("TRUNCATE TABLE location CASCADE");
  await knex.raw("TRUNCATE TABLE research CASCADE");
  await knex.raw("TRUNCATE TABLE department CASCADE");
};
