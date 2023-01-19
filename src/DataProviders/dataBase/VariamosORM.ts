import { Sequelize } from "sequelize";

const sequelizeVariamos = new Sequelize(
  "VariamosDB",
  "adminpg",
  "D6w9yRIWw7r92opvkVzp",
  {
    host: "variamos-db.postgres.database.azure.com",
    // host: "db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      ssl: true,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      timestamps: true
    }
  }
);
export default sequelizeVariamos;
