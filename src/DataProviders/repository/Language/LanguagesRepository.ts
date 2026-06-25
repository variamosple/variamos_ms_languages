import { QueryTypes } from "sequelize";
import { PagedModel } from "../../../Domain/Core/Entities/PagedModel";
import { RequestModel } from "../../../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../../../Domain/Core/Entities/ResponseModel";
import { LanguageElementDraw } from "../../../Domain/Language/Entities/LanguageElementDraw";
import { LanguageFilter } from "../../../Domain/Language/Entities/LanguageFilter";
import { LanguageSemantic } from "../../../Domain/Language/Entities/LanguageSemantic";
import { Language } from "../../../Domain/Language/Entities/LanguageV2";
import { SemanticsFilter } from "../../../Domain/Language/Entities/SemanticFilter";
import { User } from "../../../Domain/Session/Entities/User";
import sequelizeVariamos from "../../dataBase/VariamosORM";
import { BaseRepository } from "../BaseRepository";

export class LanguageRepository extends BaseRepository {
  async getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    const response = new ResponseModel<Language[]>(request.transactionId);
    try {
      const { data: filter = new LanguageFilter() } = request;
      const replacements = this.initilizeReplacements(filter);
      console.log(replacements);
      response.totalCount = await sequelizeVariamos
        .query(
          `
            SELECT COUNT(DISTINCT l.id)
            FROM variamos.language AS l
            LEFT JOIN variamos.user_language AS ul ON (l.id = ul.language_id AND (:userId IS NOT NULL) AND (ul.access_level = 'OWNER' OR ul.access_level = 'SHARED') AND ul.user_id = :userId)
            WHERE (:name IS NULL OR l.name ILIKE '%' || :name || '%')
              AND (:userId IS NULL OR ul.user_id = :userId)
              AND (:status IS NULL OR l."stateAccept" = :status);
              `,
              { type: QueryTypes.SELECT, replacements }
        )
        .then((result: any) => +result?.[0]?.count || 0);

      response.data = await sequelizeVariamos
        .query(
          `
            SELECT l.*, uo.name AS owner_name, uo.id AS owner_id, ul.access_level
            FROM variamos.language AS l
            JOIN variamos.user_language AS ul ON (l.id = ul.language_id) 
            JOIN variamos.user_language AS ulo ON (l.id = ulo.language_id AND ulo.access_level = 'OWNER')
            JOIN variamos.user AS uo ON (ulo.user_id = uo.id)
            WHERE (:name IS NULL OR l.name ILIKE '%' || :name || '%')
              AND (:userId IS NULL OR ul.user_id = :userId)
              AND (:userId IS NOT NULL OR ul.access_level = 'OWNER')
              AND (:status IS NULL OR l."stateAccept" = :status)
              ORDER BY l.name
              LIMIT :pageSize OFFSET (:pageNumber - 1) * :pageSize;
              `,
              {
            type: QueryTypes.SELECT,
            replacements,
          }
        )
        .then((result: any[]) =>
          result.map<Language>((row) =>
            Language.builder()
              .setId(row.id)
              .setName(row.name)
              .setAbstractSyntax(row.abstractSyntax)
              .setConcreteSyntax(row.concreteSyntax)
              .setStateAccept(row.stateAccept)
              .setSemantics(row.semantics)
              .setType(row.type)
              .setOwnerName(row.owner_name)
              .setOwnerId(row.owner_id)
              .setAccessLevel(replacements.userId ? row.access_level : null)
              .setCreatedAt(row.createdAt)
              .setUpdatedAt(row.updatedAt)
              .build()
          )
        );
    } catch (error) {
      console.error("Error in getLanguages:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async getLanguageSemantics(
    request: RequestModel<SemanticsFilter>
  ): Promise<ResponseModel<LanguageSemantic[]>> {
    const response = new ResponseModel<LanguageSemantic[]>(
      request.transactionId
    );
    try {
      const { data: filter = new PagedModel() } = request;

      const replacements = this.initilizeReplacements(filter);

      response.totalCount = await sequelizeVariamos
        .query(
          `
            SELECT COUNT(1)
            FROM variamos.language
            WHERE semantics IS NOT NULL AND semantics <> '{}'
              AND (:searchValue IS NULL OR name || ': [' || type || ']' ILIKE '%' || :searchValue || '%');
          `,
          { type: QueryTypes.SELECT, replacements }
        )
        .then((result: any) => +result?.[0]?.count || 0);

      response.data = await sequelizeVariamos
        .query(
          `
            SELECT id, name, type, semantics
            FROM variamos.language
            WHERE semantics IS NOT NULL AND semantics <> '{}'
              AND (:searchValue IS NULL OR name || ': [' || type || ']' ILIKE '%' || :searchValue || '%')
            ORDER BY name
            LIMIT :pageSize OFFSET (:pageNumber - 1) * :pageSize;
          `,
          {
            type: QueryTypes.SELECT,
            replacements,
          }
        )
        .then((result: any[]) =>
          //TODO: move this to a mapper file/class
          result.map<LanguageSemantic>((row) => {
            return {
              id: row.id,
              name: row.name,
              semantics: row.semantics,
              type: row.type,
            };
          })
        );
    } catch (error) {
      console.error("Error in getLanguageSemantics:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async getLanguageElementsDraw(
    request: RequestModel<PagedModel>
  ): Promise<ResponseModel<LanguageElementDraw[]>> {
    const response = new ResponseModel<LanguageElementDraw[]>(
      request.transactionId
    );
    try {
      const { data: filter = new PagedModel() } = request;

      const replacements = this.initilizeReplacements(filter);

      response.totalCount = await sequelizeVariamos
        .query(
          `
            SELECT COUNT(1)
            FROM variamos.language,
            LATERAL jsonb_each(language."concreteSyntax"->'elements') AS kv(key, value)
            WHERE kv.value ? 'draw'
              AND kv.value->>'draw' <> '';
          `,
          { type: QueryTypes.SELECT }
        )
        .then((result: any) => +result?.[0]?.count || 0);

      response.data = await sequelizeVariamos
        .query(
          `
            SELECT id, name, kv.key AS element_name, kv.value->'draw' AS draw
            FROM variamos.language,
            LATERAL jsonb_each(language."concreteSyntax"->'elements') AS kv(key, value)
            WHERE kv.value ? 'draw'
              AND kv.value->>'draw' <> ''
            ORDER BY name, kv.key
            LIMIT :pageSize OFFSET (:pageNumber - 1) * :pageSize;
          `,
          {
            type: QueryTypes.SELECT,
            replacements,
          }
        )
        .then((result: any[]) =>
          //TODO: move this to a mapper file/class
          result.map<LanguageElementDraw>((row) => {
            return {
              id: row.id,
              name: row.name,
              elementName: row.element_name,
              draw: row.draw,
            };
          })
        );
    } catch (error) {
      console.error("Error in getLanguageElementsDraw:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async getSharedUsersByLanguage(
    languageId: number
  ): Promise<ResponseModel<User[]>> {
    const response = new ResponseModel<User[]>("getSharedUsersByLanguage");
    try {
      response.data = await sequelizeVariamos
        .query(
          `
                SELECT u.id, u.user, u.name, u.email
                FROM variamos.user u
                INNER JOIN variamos.user_language ul ON u.id = ul.user_id
                WHERE (ul.language_id = ${languageId} AND ul.access_level = 'SHARED')
          `,
          {
            type: QueryTypes.SELECT,
            replacements: { languageId },
          }
        )
        .then((result: any[]) =>
          result.map<User>((row) => ({
            id: row.id,
            user: row.user,
            name: row.name,
            email: row.email,
          }))
        );
    } catch (error) {
      console.error("Error in getSharedUsersByLanguage:", error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async shareLanguageWithUser(
    languageId: number,
    userId: string
  ): Promise<ResponseModel<void>> {
    console.log("shareLanguageWithUser", languageId, userId);
    const response = new ResponseModel<void>("shareLanguageWithUser");
    try {
      await sequelizeVariamos
        .query(
          `
                INSERT INTO variamos.user_language (user_id, language_id, access_level)
                VALUES (:userId, :languageId, 'SHARED')
          `,
          {
            type: QueryTypes.INSERT,
            replacements: { userId, languageId },
          }
        );
    } catch (error) {
      console.error("Error in shareLanguageWithUser:", error);
      response.withError(500, "Internal server error");
    }

    return response;
  }
  
  async unshareLanguageWithUser(
    languageId: number,
    userId: string
  ): Promise<ResponseModel<void>> {
    console.log("unshareLanguageWithUser", languageId, userId);
    const response = new ResponseModel<void>("unshareLanguageWithUser");
    try {
      await sequelizeVariamos
        .query(
          `
                DELETE FROM variamos.user_language
                WHERE user_id = :userId AND language_id = :languageId
          `,
          {
            type: QueryTypes.DELETE,
            replacements: { userId, languageId },
          }
        );
    } catch (error) {
      console.error("Error in unshareLanguageWithUser:", error);
      response.withError(500, "Internal server error");
    }

    return response;
  }
}

export const LanguageRepositoryInstance = new LanguageRepository();
