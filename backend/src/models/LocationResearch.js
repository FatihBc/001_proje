const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class LocationResearch extends Model {
  static get tableName() {
    return "location_research";
  }

  static get idColumn() {
    return ["location_id", "research_id"];
  }
}

module.exports = LocationResearch;
