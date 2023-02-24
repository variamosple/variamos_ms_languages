// import Sequelize, { JSON, JSONB } from "sequelize";
// import variamos_db from "../../../DataProviders/dataBase/variamos";

import Sequelize from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";

export const OrmUserLanguage = sequelize.define(
  "user_language",
  {
    user_id: {
      type: Sequelize.TEXT, 
      primaryKey: true, 
    },
    language_id: {
      type: Sequelize.INTEGER, 
      primaryKey: true
    } 
  },
  {
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
  }
);

export class UserLanguage {
  user_id?: string;
  language_id?: number; 

  constructor(
    user_id?: string,
  language_id?: number
  ) {
    this.user_id = user_id;
    this.language_id = language_id; 
  }
}

export const UserLanguageSchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    language_id: { type: "string" } 
  },
  required: ["user_id", "language_id"],
  additionalProperties: false,
}; 


export function SearchUserPermissions(userId:string){
  let query = "SELECT v.* from variamos.sp_view_permissions_by_user('" + userId + "') v" 
  return sequelize.query(query);
}