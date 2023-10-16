import { Sequelize } from "sequelize";
import { Config } from "../../Config";

const sequelizeVariamos = new Sequelize(
  Config.DB.DATABASE,
  Config.DB.USER,
  Config.DB.PASSWORD,
  {
    host: Config.DB.HOST, 
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      ssl: false,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      timestamps: true
    }
  }
);
export default sequelizeVariamos;
