import { Router } from 'express';
import userLanguagesV2Router from './userLanguagesV2EntryPoints';
import { LanguageUseCase } from '../Domain/Language/LanguageUseCase';
import { PagedModel } from '../Domain/Core/Entities/PagedModel';
import { RequestModel } from '../Domain/Core/Entities/RequestModel';
import { ResponseModel } from '../Domain/Core/Entities/ResponseModel';
import { UsersFilter } from '../Domain/Session/Entities/UsersFilter';
import { UsersUseCase } from '../Domain/Session/UsersUseCase';

export const USERS_V2_ROUTE = '/v2/users';

const usersV2Router = Router();

usersV2Router.use('/:userId/languages', userLanguagesV2Router);

usersV2Router.get('/shared/:languageId', async (req, res) => {
    const { languageId } = req.params;
    const transactionId = 'getSharedUsersByLanguage';

    try {
        if (!languageId) {
            return res.status(400).json({
                transactionId,
                errorCode: 400,
                message: 'languageId is required'
            });
        }

        const response = await new LanguageUseCase().getSharedUsersByLanguage(parseInt(languageId));
        const status = response.errorCode || 200;
        res.status(status).json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            transactionId,
            errorCode: 500,
            message: 'Internal Server Error'
        });
    }
});

async function queryUsersRepository(transactionId: string, languageId: number, name: string | null, email: string | null, pageNumber: number, pageSize: number, res: any) {
  try {
    const filter: UsersFilter = UsersFilter.builder()
      .setLanguageId(languageId)
      .setName(name as string)
      .setEmail(email as string)
      .setPageNumber(pageNumber as unknown as number)
      .setPageSize(pageSize as unknown as number)
      .build();

    const request = new RequestModel<UsersFilter>(transactionId, filter);
    const response = await new UsersUseCase().getUsersNotShared(request);

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
}

usersV2Router.get("/:languageId", async (req, res) => {
  const transactionId = "getUsersNotShared";
  const { languageId } = req.params;
  const { pageNumber, pageSize, name = null, email = null } = req.query;

  queryUsersRepository(transactionId, parseInt(languageId), name as string, email as string, pageNumber as unknown as number, pageSize as unknown as number, res);
});

usersV2Router.post("/share/:userId/:languageId", async (req, res) => {
  const transactionId = "shareLanguageWithUser";
  const { languageId, userId } = req.params;

  try {
    const response = await new LanguageUseCase().shareLanguageWithUser(parseInt(languageId), userId);
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

usersV2Router.post("/unshare/:userId/:languageId", async (req, res) => {
  const transactionId = "unshareLanguageWithUser";
  const { languageId, userId } = req.params;

  try {
    const response = await new LanguageUseCase().unshareLanguageWithUser(parseInt(languageId), userId);
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

export default usersV2Router;
