import express from "express";
import sequelizeVariamos from "../../DataProviders/dataBase/VariamosORM";
import indexRoutes from "../../EntryPoints/languageEntryPoints";

const app = express();
var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

async function init() {
  // sequelizeVariamos.sync({ force: true });

  await app.listen(4000);
  console.log("Server on port", 4000);
}

init();
