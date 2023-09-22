import express from "express";
import sequelizeVariamos from "../../DataProviders/dataBase/VariamosORM";
import indexRoutes from "../../EntryPoints/languageEntryPoints";
import { Config } from "../../Config";

const app = express();
var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

// app.use(cors());

app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));
app.use(indexRoutes);

async function init() {
  // sequelizeVariamos.sync({ force: true });

  await app.listen(Config.PORT);
  console.log("Server on port", "http://localhost:" + Config.PORT);
  console.log("Version", Config.VERSION);
}

init();
