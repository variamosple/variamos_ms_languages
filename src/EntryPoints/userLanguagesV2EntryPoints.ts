import { isAuthenticated } from "@variamosple/variamos-security";
import { Router } from "express";
import { RequestModel } from "../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../Domain/Core/Entities/ResponseModel";
import { LanguageFilter } from "../Domain/Language/Entities/LanguageFilter";
import { LanguageUseCase } from "../Domain/Language/LanguageUseCase";

const userLanguagesV2Router = Router({ mergeParams: true });

userLanguagesV2Router.get("/", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  const sessionUserId = req.user?.id;
  const { pageNumber, pageSize, name = null } = req.query;
  const transactionId = "getUserLanguages";

  try {
    if (!userId) {
      return res
        .status(400)
        .json(new ResponseModel(transactionId, 400, "userId is required"));
    } else if (userId !== sessionUserId) {
      return res
        .status(403)
        .json(new ResponseModel(transactionId, 403, "Forbidden"));
    }

    const filter: LanguageFilter = LanguageFilter.builder()
      .setUserId(userId)
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
  }
});

export default userLanguagesV2Router;
