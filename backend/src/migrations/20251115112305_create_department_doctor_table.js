/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("department_doctor", (table) => {
    table.increments("id").primary();
    table
      .integer("department_id")
      .unsigned()
      .references("department_id")
      .inTable("department")
      .onDelete("CASCADE");
    table
      .integer("doctor_id")
      .unsigned()
      .references("doctor_id")
      .inTable("doctor")
      .onDelete("CASCADE");
    table.unique(["department_id", "doctor_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("department_doctor");
};
