const { Model } = require("objection");
const knex = require("../db/knex");
Model.knex(knex);

class Doctor extends Model {
  static get tableName() {
    return "doctor";
  }

  static get idColumn() {
    return "doctor_id";
  }

  static get relationMappings() {
    const Department = require("./Department");
    const Location = require("./Location");
    const Research = require("./Research");

    return {
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: "doctor.department_id",
          to: "department.department_id",
        },
      },
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "doctor.location_id",
          to: "location.location_id",
        },
      },
      researches: {
        relation: Model.ManyToManyRelation,
        modelClass: Research,
        join: {
          from: "doctor.doctor_id",
          through: {
            from: "doctor_research.doctor_id",
            to: "doctor_research.research_id",
          },
          to: "research.research_id",
        },
      },
    };
  }
}

module.exports = Doctor;
