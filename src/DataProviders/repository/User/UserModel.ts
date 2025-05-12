import Sequelize, { Model } from "sequelize";
import sequelizeVariamos from "../../dataBase/VariamosORM";

export interface UserAttributes {
  id?: string;
  name?: string;
  email?: string;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
}

UserModel.init(
  {
    id: {
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    name: { type: Sequelize.TEXT },
    email: { type: Sequelize.TEXT },
  },
  {
    tableName: "user",
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
    sequelize: sequelizeVariamos,
  }
);
