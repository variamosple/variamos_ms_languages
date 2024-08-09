import { Router } from 'express';
import userLanguagesV2Router from './userLanguagesV2EntryPoints';

export const USERS_V2_ROUTE = '/v2/users';

const usersV2Router = Router();

usersV2Router.use('/:userId/languages', userLanguagesV2Router);

export default usersV2Router;
