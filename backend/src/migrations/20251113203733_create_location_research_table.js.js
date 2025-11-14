/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("location_research", function (table) {
    table.increments("id").primary();
    table.integer("location_id").unsigned().notNullable();
    table.integer("research_id").unsigned().notNullable();

    table
      .foreign("location_id")
      .references("location.location_id")
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
  return knex.schema.dropTableIfExists("location_research");
};
