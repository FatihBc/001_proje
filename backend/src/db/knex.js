const knex = require("knex");
const config = require("../../knexfile");

const environment = process.env.NODE_ENV || "development";
console.log("Knex environment:", environment);

const db = knex(config[environment]);

module.exports = db;
