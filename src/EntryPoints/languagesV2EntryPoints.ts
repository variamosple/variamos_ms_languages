import { Router } from 'express';
import { RequestModel } from '../Domain/Core/Entities/RequestModel';
import { ResponseModel } from '../Domain/Core/Entities/ResponseModel';
import { LanguageFilter } from '../Domain/Language/Entities/LanguageFilter';
import { LanguageUseCase } from '../Domain/Language/LanguageUseCase';

export const LANGUAGES_V2_ROUTE = '/v2/languages';

const languagesV2Router = Router();

languagesV2Router.get('/', async (req, res) => {
  const transactionId = 'getLanguages';
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
    console.log('Error:', error);
    const response = new ResponseModel(
      transactionId,
      500,
      'Internal Server Error'
    );
    res.status(500).json(response);
  }
});

export default languagesV2Router;
