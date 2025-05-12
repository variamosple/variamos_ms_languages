import { hasPermissions } from "@variamosple/variamos-security";
import { Router } from "express";
import { RequestModel } from "../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../Domain/Core/Entities/ResponseModel";
import { AdminLanguageUseCase } from "../Domain/Language/AdminLanguageUseCase";
import { LanguageFilter } from "../Domain/Language/Entities/LanguageFilter";
import { Language } from "../Domain/Language/Entities/LanguageV2";

export const ADMIN_LANGUAGES_V1_ROUTE = "/v1/admin/languages";

const adminLanguagesV1Router = Router();

adminLanguagesV1Router.get(
  "/",
  hasPermissions(["admin::languages::query"]),
  async (req, res) => {
    const transactionId = "adminGetLanguages";
    const { pageNumber, pageSize, name = null, status = null } = req.query;
    try {
      const filter: LanguageFilter = LanguageFilter.builder()
        .setName(name as string)
        .setStatus(status as string)
        .setPageNumber(pageNumber as unknown as number)
        .setPageSize(pageSize as unknown as number)
        .build();

      const request = new RequestModel<LanguageFilter>(transactionId, filter);
      const response = await new AdminLanguageUseCase().getLanguages(request);

      const responseStatus = response.errorCode || 200;
      res.status(responseStatus).json(response);
    } catch (error) {
      console.error("Error:", error);
      const response = new ResponseModel(
        transactionId,
        500,
        "Internal Server Error"
      );
      res.status(500).json(response);
    }
  }
);

adminLanguagesV1Router.delete(
  "/:languageId",
  hasPermissions(["admin::languages::query"]),
  async (req, res) => {
    const transactionId = "adminDeleteLanguages";
    const languageId = req.params.languageId;

    try {
      if (!languageId || Number.isNaN(+languageId)) {
        res
          .status(400)
          .json(
            new ResponseModel<unknown>(transactionId).withError(
              400,
              "languageId is required."
            )
          );
      }

      const request = new RequestModel<number>(transactionId, +languageId);
      const response = await new AdminLanguageUseCase().deleteLanguage(request);

      const status = response.errorCode || 200;
      res.status(status).json(response);
    } catch (error) {
      console.error(error);
      const response = new ResponseModel(
        transactionId,
        500,
        "Internal Server Error"
      );
      res.status(500).json(response);
    }
  }
);

adminLanguagesV1Router.put(
  "/:languageId",
  hasPermissions(["admin::languages::update"]),
  async (req, res) => {
    const transactionId = "adminUpdateLanguage";
    const languageId = req.params.languageId;
    const { name, stateAccept } = req.body;

    try {
      if (!languageId || Number.isNaN(+languageId) || !stateAccept || !name) {
        res
          .status(400)
          .json(
            new ResponseModel<unknown>(transactionId).withError(
              400,
              "languageId, name, and stateAccept are required."
            )
          );
      }

      const language: Language = Language.builder()
        .setId(+languageId)
        .setName(name)
        .setStateAccept(stateAccept)
        .build();

      const request = new RequestModel<Language>(transactionId, language);
      const response = await new AdminLanguageUseCase().updateLanguage(request);

      const status = response.errorCode || 200;
      res.status(status).json(response);
    } catch (error) {
      console.error(error);
      const response = new ResponseModel(
        transactionId,
        500,
        "Internal Server Error"
      );
      res.status(500).json(response);
    }
  }
);

export default adminLanguagesV1Router;
