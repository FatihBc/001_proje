/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("research", function (table) {
    table.increments("research_id").primary();
    table.string("title").notNullable();
    table.string("field").notNullable(); // araştırma alanı (örn. Kardiyoloji, Nöroloji)
    table.date("start_date");
    table.date("end_date");
    table.text("description");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("research");
};
