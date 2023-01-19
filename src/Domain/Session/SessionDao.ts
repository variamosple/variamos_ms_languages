// import Sequelize, { JSON, JSONB } from "sequelize";
// import variamos_db from "../../../DataProviders/dataBase/variamos";

import Sequelize from "sequelize";
import sequelize from "../../DataProviders/dataBase/VariamosORM";

export function SelectUserByEmail(email:string){
  let query = "select id, name from variamos.user where email='" + email + "'" 
  return sequelize.query(query);
}

export function SelectPermissionsByUser(userId:string){
  let query = "SELECT p.id, p.name " +
  "FROM variamos.permission p " +
  "inner join variamos.role_permission rp on rp.permission_id=p.id " +
  "inner join variamos.role r on r.id = rp.role_id " +
  "inner join variamos.user_role ur on ur.role_id=r.id " +
  "inner join variamos.user u on u.id=ur.user_id and u.id='" + userId + "' " +
  "group by p.id, p.name" 
  return sequelize.query(query);
}
