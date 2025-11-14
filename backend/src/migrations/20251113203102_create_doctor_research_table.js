/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctor_research", function (table) {
    table.increments("id").primary();
    table.integer("doctor_id").unsigned().notNullable();
    table.integer("research_id").unsigned().notNullable();

    // Foreign key ilişkileri
    table
      .foreign("doctor_id")
      .references("doctor.doctor_id")
      .onDelete("CASCADE");
    table
      .foreign("research_id")
      .references("research.research_id")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("doctor_research");
};
