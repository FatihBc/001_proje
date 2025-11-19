const cleaner = require("knex-cleaner");

exports.seed = async function (knex) {
  // Önce tabloları temizle
  await cleaner.clean(knex, {
    mode: "delete",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });

  // Sonra sequence reset
  await knex.raw("ALTER SEQUENCE doctors_doctor_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE departments_department_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE locations_location_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE research_research_id_seq RESTART WITH 1");
};
