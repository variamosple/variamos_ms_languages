import { LanguageRepositoryInstance } from '../../DataProviders/repository/LanguagesRepository';
import { RequestModel } from '../Core/Entities/RequestModel';
import { ResponseModel } from '../Core/Entities/ResponseModel';
import { Language } from './Entities/Language';
import { LanguageFilter } from './Entities/LanguageFilter';

export class LanguageUseCase {
  getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    return LanguageRepositoryInstance.getLanguages(request);
  }
}
