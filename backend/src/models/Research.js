const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class Research extends Model {
  static get tableName() {
    return "research";
  }

  static get idColumn() {
    return "research_id";
  }

  static get relationMappings() {
    const Doctor = require("./Doctor");
    const Department = require("./Department");
    const Location = require("./Location");

    return {
      doctors: {
        relation: Model.ManyToManyRelation,
        modelClass: Doctor,
        join: {
          from: "research.research_id",
          through: {
            from: "doctor_research.research_id",
            to: "doctor_research.doctor_id",
          },
          to: "doctor.doctor_id",
        },
      },
      departments: {
        relation: Model.ManyToManyRelation,
        modelClass: Department,
        join: {
          from: "research.research_id",
          through: {
            from: "department_research.research_id",
            to: "department_research.department_id",
          },
          to: "department.department_id",
        },
      },
      locations: {
        relation: Model.ManyToManyRelation,
        modelClass: Location,
        join: {
          from: "research.research_id",
          through: {
            from: "location_research.research_id",
            to: "location_research.location_id",
          },
          to: "location.location_id",
        },
      },
    };
  }
}

module.exports = Research;
