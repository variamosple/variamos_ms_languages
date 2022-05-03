import { Sequelize } from "sequelize";

const sequelizeVariamos = new Sequelize(
  "VariamosDB",
  "adminpg",
  "D6w9yRIWw7r92opvkVzp",
  {
    host: "variamos-db.postgres.database.azure.com",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      ssl: true,
    },
  }
);
export default sequelizeVariamos;
