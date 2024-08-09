import { QueryTypes } from 'sequelize';
import { RequestModel } from '../../Domain/Core/Entities/RequestModel';
import { ResponseModel } from '../../Domain/Core/Entities/ResponseModel';
import { LanguageFilter } from '../../Domain/Language/Entities/LanguageFilter';
import { Language } from '../../Domain/Language/Entities/LanguageV2';
import sequelizeVariamos from '../dataBase/VariamosORM';

interface Replacements {
  [key: string]: any;
}

// TODO: move this method to a filer under mapper foler
const initilizeReplacements = (filter: Replacements) => {
  if (!filter) {
    return {};
  }

  return Object.entries(filter).reduce<Replacements>((result, [key, value]) => {
    result[key] = value === undefined ? null : value;

    return result;
  }, {});
};

export class LanguageRepository {
  async getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    const response = new ResponseModel<Language[]>(request.transactionId);
    try {
      const { data: filter = new LanguageFilter() } = request;

      const replacements = initilizeReplacements(filter);

      response.totalCount = await sequelizeVariamos
        .query(
          `
            SELECT COUNT(1)
            FROM variamos.language AS l
            LEFT JOIN variamos.user_language AS ul ON (l.id = ul.language_id)
            WHERE (:name IS NULL OR l.name ILIKE '%' || :name || '%')
              AND (:userId IS NULL OR ul.user_id = :userId);
          `,
          { type: QueryTypes.SELECT, replacements }
        )
        .then((result: any) => +result?.[0]?.count || 0);

      response.data = await sequelizeVariamos
        .query(
          `
            SELECT l.*, u.name AS owner_name, ul.user_id
            FROM variamos.language AS l
            LEFT JOIN variamos.user_language AS ul ON (l.id = ul.language_id AND ul.access_level = 'OWNER')
            LEFT JOIN variamos.user AS u ON (ul.user_id = u.id)
            WHERE (:name IS NULL OR l.name ILIKE '%' || :name || '%')
              AND (:userId IS NULL OR ul.user_id = :userId)
            ORDER BY l.name
            LIMIT :pageSize OFFSET (:pageNumber - 1) * :pageSize;
          `,
          {
            type: QueryTypes.SELECT,
            replacements,
          }
        )
        .then((result: any[]) =>
          //TODO: move this to a mapper file/class
          result.map<Language>((row) => {
            return {
              id: row.id,
              name: row.name,
              abstractSyntax: row.abstractSyntax,
              concreteSyntax: row.concreteSyntax,
              stateAccept: row.stateAccept,
              semantics: row.semantics,
              type: row.type,
              ownerName: row.owner_name,
              userId: row.user_id,
            };
          })
        );
    } catch (error) {
      console.error('Error in getLanguages:', request, error);
      response.withError(500, 'Internal server error');
    }

    return response;
  }
}

export const LanguageRepositoryInstance = new LanguageRepository();
