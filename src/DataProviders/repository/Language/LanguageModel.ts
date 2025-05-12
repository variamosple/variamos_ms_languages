import Sequelize, { Model } from "sequelize";
import sequelizeVariamos from "../../dataBase/VariamosORM";
import { UserModel } from "../User/UserModel";
import { UserLanguageModel } from "./UserLanguage";

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

export class LanguageModel
  extends Model<LanguageAttributes>
  implements LanguageAttributes
{
  declare id: number;
  declare name: string;
  declare abstractSyntax?: JSON;
  declare concreteSyntax?: JSON;
  declare type: string;
  declare stateAccept: string;
  declare semantics?: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare owners?: UserModel[];
}

LanguageModel.init(
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
    freezeTableName: true,
    schema: "variamos",
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize: sequelizeVariamos,
  }
);

LanguageModel.belongsToMany(UserModel, {
  through: UserLanguageModel,
  foreignKey: "language_id",
  as: "owners",
});

UserModel.belongsToMany(LanguageModel, {
  through: UserLanguageModel,
  foreignKey: "user_id",
  as: "languages",
});
