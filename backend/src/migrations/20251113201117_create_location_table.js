/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("location", function (table) {
    table.increments("location_id").primary();
    table.string("hospital_name").notNullable();
    table.string("city").notNullable();
    table.string("address");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("location");
};
