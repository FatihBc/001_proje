exports.seed = async function (knex) {
  knex.raw("TRUNCATE TABLE users, products CASCADE");
};
