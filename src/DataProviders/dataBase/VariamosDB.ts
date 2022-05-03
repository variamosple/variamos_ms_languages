import { Pool } from "pg";

export const pool = new Pool({
  user: "adminpg",
  host: "variamos-db.postgres.database.azure.com",
  password: "D6w9yRIWw7r92opvkVzp",
  database: "VariamosDB",
  port: 5432,
  ssl: true,
});
