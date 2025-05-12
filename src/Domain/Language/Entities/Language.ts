// import Sequelize, { JSON, JSONB } from "sequelize";
// import variamos_db from "../../../DataProviders/dataBase/variamos";

import Sequelize, { Model } from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";

export interface LanguageAttributes {
  id?: number;
  name?: string;
  abstractSyntax?: any;
  concreteSyntax?: any;
  type?: string;
  stateAccept?: string;
  semantics?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrmLanguage
  extends Model<LanguageAttributes>
  implements LanguageAttributes
{
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;
  stateAccept?: string;
  semantics?: JSON;
  createdAt?: Date;
  updatedAt?: Date;
}

OrmLanguage.init(
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
    semantics: {
      type: Sequelize.JSONB,
    },
    stateAccept: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at",
    },
  },
  {
    tableName: "language",
    sequelize,
    freezeTableName: true,
    schema: "variamos",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export class Language {
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;
  stateAccept?: string;
  semantics?: JSON;

  constructor(
    id?: number,
    name?: string,
    abstractSyntax?: JSON,
    concreteSyntax?: JSON,
    type?: string,
    stateAccept?: string,
    semantics?: JSON
  ) {
    this.id = id;
    this.name = name;
    this.abstractSyntax = abstractSyntax;
    this.concreteSyntax = concreteSyntax;
    this.type = type;
    this.stateAccept = stateAccept;
    this.semantics = semantics;
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
    semantics: { type: "object" },
  },
  required: ["name", "abstractSyntax", "concreteSyntax", "type", "semantics"],
  additionalProperties: false,
};

export function SearchLanguagesByTypeAndUser(type: string, userId: string) {
  let query =
    "select v.* from variamos.sp_view_languages('" +
    type +
    "', '" +
    userId +
    "' ) v";
  return sequelize.query(query);
}

export function SearchLanguagesByUser(userId: string) {
  let query =
    "select v.* from variamos.sp_view_languages_by_user('" + userId + "' ) v";
  return sequelize.query(query);
}
