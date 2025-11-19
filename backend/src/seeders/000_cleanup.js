exports.seed = async function (knex) {
  knex.raw("TRUNCATE TABLE doctor, products CASCADE");
  knex.raw("TRUNCATE TABLE location, products CASCADE");
  knex.raw("TRUNCATE TABLE research, products CASCADE");
  knex.raw("TRUNCATE TABLE department, products CASCADE");
};
