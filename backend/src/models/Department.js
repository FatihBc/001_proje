const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class Department extends Model {
  static get tableName() {
    return "department";
  }

  static get idColumn() {
    return "department_id";
  }
}

module.exports = Department;
