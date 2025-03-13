import { Router } from "express";
import ExternalFunctionManagement from "../Domain/Language/externalFunctionUseCases";
import LanguageManagement from "../Domain/Language/languageUseCases";

import { hasPermissions } from "@variamosple/variamos-security";
import SessionManagement from "../Domain/Session/sessionUseCases";

const router = Router();

let _LanguageManagement = new LanguageManagement();
let _ExternalFunctionManagement = new ExternalFunctionManagement();
let _SessionManagement = new SessionManagement();

router.get("/", _LanguageManagement.getVersion);

router.get("/version", _LanguageManagement.getVersion);
router.get(
  "/languages",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getLanguages
);
router.get(
  "/languages/detail",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getDetailLanguages
);
router.get(
  "/languages/:type",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getLanguageByType
);
router.post(
  "/languages",
  hasPermissions(["languages::create"]),
  _LanguageManagement.createLanguage
);
router.put(
  "/languages/:id",
  hasPermissions(["languages::update"]),
  _LanguageManagement.updateLanguage
);
router.delete(
  "/languages/:id/:userId",
  hasPermissions(["languages::delete"]),
  _LanguageManagement.deleteLanguage
);

router.get(
  "/languagesbytypeanduser/:type/:userId",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getLanguageByTypeAndUser
);
router.get(
  "/languagesbyuser/:userId",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getLanguagesByUser
);

router.post("/signin", _SessionManagement.signIn);

router.get(
  "/languages/:type/detail",
  hasPermissions(["languages::query"]),
  _LanguageManagement.getDetailLanguageByType
);

router.get(
  "/languages/:languageId/externalfunctions",
  _ExternalFunctionManagement.getExternalFuntions
);

router.post(
  "/languages/:languageId/externalfunctions",
  _ExternalFunctionManagement.createExternalFunction
);

router.put(
  "/externalfunctions/:exid",
  _ExternalFunctionManagement.updateExternalFunction
);

router.delete(
  "/externalfunctions/:exid",
  _ExternalFunctionManagement.deleteExternalFunction
);

export default router;
