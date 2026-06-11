import { Router } from "express";
import { PagedModel } from "../Domain/Core/Entities/PagedModel";
import { RequestModel } from "../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../Domain/Core/Entities/ResponseModel";
import { LanguageFilter } from "../Domain/Language/Entities/LanguageFilter";
import { SemanticsFilter } from "../Domain/Language/Entities/SemanticFilter";
import { LanguageUseCase } from "../Domain/Language/LanguageUseCase";

export const LANGUAGES_V2_ROUTE = "/v2/languages";

const languagesV2Router = Router();

languagesV2Router.get("/", async (req, res) => {
  const transactionId = "getLanguages";
  const { pageNumber, pageSize, name = null } = req.query;
  try {
    const filter: LanguageFilter = LanguageFilter.builder()
      .setName(name as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .build();

    const request = new RequestModel<LanguageFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguages(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error"
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/elements/draws", async (req, res) => {
  const transactionId = "getLanguageElementsDraws";
  const { pageNumber = null, pageSize = null } = req.query;
  try {
    const filter: PagedModel = new PagedModel(
      parseInt(pageNumber as string) || undefined,
      parseInt(pageSize as string) || undefined
    );

    const request = new RequestModel<PagedModel>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguageElementsDraw(
      request
    );

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error"
    );
    res.status(500).json(response);
  }
});

languagesV2Router.get("/semantics", async (req, res) => {
  const transactionId = "getLanguageSemantics";
  const { pageNumber = null, pageSize = null, search = null } = req.query;
  try {
    const filter: SemanticsFilter = SemanticsFilter.builder()
      .setSearchValue(search as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .build();

    const request = new RequestModel<SemanticsFilter>(transactionId, filter);
    const response = await new LanguageUseCase().getLanguageSemantics(request);

    const status = response.errorCode || 200;
    res.status(status).json(response);
  } catch (error) {
    console.error("Error:", error);
    const response = new ResponseModel(
      transactionId,
      500,
      "Internal Server Error"
    );
    res.status(500).json(response);
  }
});

export default languagesV2Router;
