import { initKeyStore } from "@variamosple/variamos-security";
import cookieParser from "cookie-parser";
import express from "express";
import { Config } from "../../Config";
import adminLanguagesV1Router, {
  ADMIN_LANGUAGES_V1_ROUTE,
} from "../../EntryPoints/adminLanguagesV1EntryPoints";
import indexRoutes from "../../EntryPoints/languageEntryPoints";
import languagesV2Router, {
  LANGUAGES_V2_ROUTE,
} from "../../EntryPoints/languagesV2EntryPoints";
import usersV2Router, {
  USERS_V2_ROUTE,
} from "../../EntryPoints/usersV2EntryPoints";

const app = express();
app.use(cookieParser(""));
var cors = require("cors");

app.use(cors({ origin: true, credentials: true }));

// app.use(cors());

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
app.use(ADMIN_LANGUAGES_V1_ROUTE, adminLanguagesV1Router);
app.use(USERS_V2_ROUTE, usersV2Router);
app.use(LANGUAGES_V2_ROUTE, languagesV2Router);
app.use(indexRoutes);

async function init() {
  // sequelizeVariamos.sync({ force: true });

  await app.listen(Config.PORT);
  initKeyStore().then();

  console.log("Server on port", "http://localhost:" + Config.PORT);
  console.log("Version", Config.VERSION);
}

init();
