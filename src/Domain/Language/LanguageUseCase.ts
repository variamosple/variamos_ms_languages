import { LanguageRepositoryInstance } from '../../DataProviders/repository/LanguagesRepository';
import { PagedModel } from '../Core/Entities/PagedModel';
import { RequestModel } from '../Core/Entities/RequestModel';
import { ResponseModel } from '../Core/Entities/ResponseModel';
import { Language } from './Entities/Language';
import { LanguageElementDraw } from './Entities/LanguageElementDraw';
import { LanguageFilter } from './Entities/LanguageFilter';
import { LanguageSemantic } from './Entities/LanguageSemantic';
import { SemanticsFilter } from './Entities/SemanticFilter';

export class LanguageUseCase {
  getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    return LanguageRepositoryInstance.getLanguages(request);
  }

  getLanguageSemantics(
    request: RequestModel<SemanticsFilter>
  ): Promise<ResponseModel<LanguageSemantic[]>> {
    return LanguageRepositoryInstance.getLanguageSemantics(request);
  }

  getLanguageElementsDraw(
    request: RequestModel<PagedModel>
  ): Promise<ResponseModel<LanguageElementDraw[]>> {
    return LanguageRepositoryInstance.getLanguageElementsDraw(request);
  }
}
