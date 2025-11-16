const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class Location extends Model {
  static get tableName() {
    return "location";
  }

  static get idColumn() {
    return "location_id";
  }
}

module.exports = Location;
