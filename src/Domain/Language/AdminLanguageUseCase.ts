import { AdminLanguageRepositoryInstance } from "../../DataProviders/repository/Language/AdminLanguagesRepository";
import { RequestModel } from "../Core/Entities/RequestModel";
import { ResponseModel } from "../Core/Entities/ResponseModel";
import { Language } from "./Entities/Language";
import { LanguageFilter } from "./Entities/LanguageFilter";

export class AdminLanguageUseCase {
  getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    return AdminLanguageRepositoryInstance.getLanguages(request);
  }

  deleteLanguage(request: RequestModel<number>): Promise<ResponseModel<void>> {
    return AdminLanguageRepositoryInstance.deleteLanguage(request);
  }

  updateLanguage(
    request: RequestModel<Language>
  ): Promise<ResponseModel<Language>> {
    return AdminLanguageRepositoryInstance.updateLanguage(request);
  }
}
