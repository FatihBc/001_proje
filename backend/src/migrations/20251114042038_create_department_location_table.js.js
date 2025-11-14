/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("department_location", function (table) {
    table.increments("id").primary();
    table.integer("department_id").unsigned().notNullable();
    table.integer("location_id").unsigned().notNullable();

    table
      .foreign("department_id")
      .references("department.department_id")
      .onDelete("CASCADE");
    table
      .foreign("location_id")
      .references("location.location_id")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("department_location");
};
