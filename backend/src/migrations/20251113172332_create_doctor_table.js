/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctor", function (table) {
    table.increments("doctor_id").primary();
    table.string("name");
    table.string("surname");
    table.date("birth_date");
    table.integer("department_id").unsigned();
    table.integer("location_id").unsigned();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("doctor");
};
