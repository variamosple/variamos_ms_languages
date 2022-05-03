// import Sequelize, { JSON, JSONB } from "sequelize";
// import variamos_db from "../../../DataProviders/dataBase/variamos";

import Sequelize from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";

export const OrmLanguage = sequelize.define(
  "language",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
    },
    abstractSyntax: {
      type: Sequelize.JSONB,
    },
    concreteSyntax: {
      type: Sequelize.JSONB,
    },
    type: {
      type: Sequelize.TEXT,
    },
    stateAccept: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
  }
);

export class Language {
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;
  stateAccept?: string;

  constructor(
    id?: number,
    name?: string,
    abstractSyntax?: JSON,
    concreteSyntax?: JSON,
    type?: string,
    stateAccept?: string
  ) {
    this.id = id;
    this.name = name;
    this.abstractSyntax = abstractSyntax;
    this.concreteSyntax = concreteSyntax;
    this.type = type;
    this.stateAccept = stateAccept;
  }
}

export const LanguageSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    abstractSyntax: { type: "object" },
    concreteSyntax: { type: "object" },
    type: { type: "string" },
    stateAccept: { type: "string" },
  },
  required: ["name", "abstractSyntax", "concreteSyntax", "type"],
  additionalProperties: false,
};
