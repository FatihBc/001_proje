const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class DepartmentResearch extends Model {
  static get tableName() {
    return "department_research";
  }

  static get idColumn() {
    return ["department_id", "research_id"];
  }
}

module.exports = DepartmentResearch;
