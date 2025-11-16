const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class DepartmentLocation extends Model {
  static get tableName() {
    return "department_location";
  }

  static get idColumn() {
    return ["department_id", "location_id"]; // composite key
  }
}

module.exports = DepartmentLocation;
