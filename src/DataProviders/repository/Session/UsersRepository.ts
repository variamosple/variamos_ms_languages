import { QueryTypes } from "sequelize";
import { RequestModel } from "../../../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../../../Domain/Core/Entities/ResponseModel";
import { UsersFilter } from "../../../Domain/Session/Entities/UsersFilter";
import { User } from "../../../Domain/Session/Entities/User";
import sequelizeVariamos from "../../dataBase/VariamosORM";
import { BaseRepository } from "../BaseRepository";

export class UsersRepository extends BaseRepository {
  async getUsersNotShared(
    request: RequestModel<UsersFilter>
  ): Promise<ResponseModel<User[]>> {
    const response = new ResponseModel<User[]>(request.transactionId);
    try {
      const { data: filter = new UsersFilter() } = request;
      const replacements = this.initilizeReplacements(filter);
      console.log(replacements);

      response.totalCount = await sequelizeVariamos
        .query(
          `
            SELECT COUNT(DISTINCT u.id)
            FROM variamos.user AS u
            WHERE u.id NOT IN (
              SELECT ul.user_id
              FROM variamos.user_language AS ul
              WHERE ul.language_id = :languageId AND ul.access_level <> 'SHARED'
            )
            AND (:name IS NULL OR u.name ILIKE '%' || :name || '%')
            AND (:email IS NULL OR u.email ILIKE '%' || :email || '%');
              `,
          { type: QueryTypes.SELECT, replacements }
        )
        .then((result: any) => +result?.[0]?.count || 0);

      response.data = await sequelizeVariamos
        .query(
          `
            SELECT u.id, u.user, u.name, u.email
            FROM variamos.user AS u
            WHERE u.id NOT IN (
              SELECT ul.user_id
              FROM variamos.user_language AS ul
              WHERE ul.language_id = :languageId
            )
            AND (:name IS NULL OR u.name ILIKE '%' || :name || '%')
            AND (:email IS NULL OR u.email ILIKE '%' || :email || '%')
            ORDER BY u.name
            LIMIT :pageSize OFFSET (:pageNumber - 1) * :pageSize;
              `,
          {
            type: QueryTypes.SELECT,
            replacements,
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
      console.error("Error in getUsersNotShared:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }
}

export const UsersRepositoryInstance = new UsersRepository();
