import { Router } from "express";
import ExternalFunctionManagement from "../Domain/Language/externalFunctionUseCases";
import LanguageManagement from "../Domain/Language/languageUseCases";
const router = Router();

let _LanguageManagement = new LanguageManagement();
let _ExternalFunctionManagement = new ExternalFunctionManagement();

router.get("/languages", _LanguageManagement.getLanguages);
router.get("/languages/detail", _LanguageManagement.getDetailLanguages);
router.get("/languages/:type", _LanguageManagement.getLanguageByType);
router.post("/languages", _LanguageManagement.createLanguage);
router.put("/languages/:id", _LanguageManagement.updateLanguage);
router.delete("/languages/:id", _LanguageManagement.deleteLanguage);

router.get(
  "/languages/:type/detail",
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
