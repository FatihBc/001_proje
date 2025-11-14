/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("department_research", function (table) {
    table.increments("id").primary();
    table.integer("department_id").unsigned().notNullable();
    table.integer("research_id").unsigned().notNullable();

    // Foreign key ilişkileri
    table
      .foreign("department_id")
      .references("department.department_id")
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
  return knex.schema.dropTableIfExists("department_research");
};
