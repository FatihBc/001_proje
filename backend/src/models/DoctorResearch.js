const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class DoctorResearch extends Model {
  static get tableName() {
    return "doctor_research";
  }

  static get idColumn() {
    return ["doctor_id", "research_id"]; // composite key
  }
}

module.exports = DoctorResearch;
