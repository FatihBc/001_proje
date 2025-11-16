const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class DepartmentDoctor extends Model {
  static get tableName() {
    return "department_doctor";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = DepartmentDoctor;
