import Sequelize, { Model } from "sequelize";
import sequelizeVariamos from "../../dataBase/VariamosORM";

export interface UserLanguageAttributes {
  userId?: string;
  languageId?: number;
  accessLevel?: string;
}

export class UserLanguageModel
  extends Model<UserLanguageAttributes>
  implements UserLanguageAttributes
{
  declare userId: string;
  declare languageId: number;
  declare accessLevel: string;
}

UserLanguageModel.init(
  {
    userId: {
      field: "user_id",
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    languageId: {
      field: "language_id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    accessLevel: {
      field: "access_level",
      type: Sequelize.CHAR(10),
    },
  },
  {
    tableName: "user_language",
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
    sequelize: sequelizeVariamos,
  }
);
