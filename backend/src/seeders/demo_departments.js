/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("department").truncate();

  await knex("department").insert([
    { name: "Kardiyoloji", description: "Kalp ve damar hastalıkları" },
    { name: "Nöroloji", description: "Sinir sistemi hastalıkları" },
    { name: "Ortopedi", description: "Kemik ve kas sistemi" },
  ]);
};
