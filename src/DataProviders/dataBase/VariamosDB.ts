import { Pool } from "pg";

export const pool = new Pool({
  user: "adminpg",
  host: "variamos-db-2024.postgres.database.azure.com",
  // host: "db",
  password: "a=m=8hos.G!-s<*M1G",
  database: "VariamosDB",
  port: 5432,
  ssl: true,
});
