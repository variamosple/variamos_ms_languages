import { Op, WhereOptions } from "sequelize";
import { RequestModel } from "../../../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../../../Domain/Core/Entities/ResponseModel";
import { LanguageFilter } from "../../../Domain/Language/Entities/LanguageFilter";
import { Language } from "../../../Domain/Language/Entities/LanguageV2";
import { LanguageOwner } from "../../../Domain/Language/Entities/LanguageV2Owner";
import { BaseRepository } from "../BaseRepository";
import { UserModel } from "../User/UserModel";
import { LanguageAttributes, LanguageModel } from "./LanguageModel";
import { UserLanguageModel } from "./UserLanguage";

export class AdminLanguageRepository extends BaseRepository {
  async getLanguages(
    request: RequestModel<LanguageFilter>
  ): Promise<ResponseModel<Language[]>> {
    const response = new ResponseModel<Language[]>(request.transactionId);
    try {
      const { data: filter = new LanguageFilter() } = request;

      const replacements = this.initilizeReplacements(filter);

      const where: WhereOptions<LanguageAttributes> = {};

      if (filter.name) {
        where.name = { [Op.iLike]: `%${replacements.name}%` };
      }

      if (filter.status) {
        where.stateAccept = filter.status;
      }

      response.totalCount = await LanguageModel.count({ where });

      response.data = await LanguageModel.findAll({
        attributes: [
          "id",
          "name",
          "stateAccept",
          "type",
          "createdAt",
          "updatedAt",
        ],
        where,
        limit: filter.pageSize!,
        offset: (filter.pageNumber! - 1) * filter.pageSize!,
        order: [["name", "desc"]],
        include: [
          {
            model: UserModel,
            as: "owners",
            attributes: ["id", "name", "email"],
            through: {
              attributes: ["accessLevel"],
            },
          },
        ],
      }).then((result) =>
        result.map<Language>((row) =>
          Language.builder()
            .setId(row.id!)
            .setName(row.name!)
            .setType(row.type!)
            .setStateAccept(row.stateAccept!)
            .setCreatedAt(row.createdAt!)
            .setUpdatedAt(row.updatedAt!)
            .setOwners(
              (row.owners || []).map(
                (owner) =>
                  new LanguageOwner(
                    owner.id,
                    owner.name,
                    owner.email,
                    (owner as any)["UserLanguageModel"].accessLevel
                  )
              )
            )
            .build()
        )
      );
    } catch (error) {
      console.error("Error in adminGetLanguages:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async deleteLanguage(
    request: RequestModel<number>
  ): Promise<ResponseModel<void>> {
    const response = new ResponseModel<void>(request.transactionId);

    try {
      const { data: id } = request;

      await UserLanguageModel.destroy({ where: { languageId: id } });
      await LanguageModel.destroy({ where: { id } });
    } catch (error) {
      console.error("Error in adminDeleteLanguage:");
      console.error(request);
      console.error(error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async updateLanguage(
    request: RequestModel<Language>
  ): Promise<ResponseModel<Language>> {
    const response = new ResponseModel<Language>(request.transactionId);

    try {
      const { id, name, stateAccept } = request.data || {};

      await LanguageModel.update(
        {
          name,
          stateAccept,
        },
        { where: { id } }
      );

      response.data = request.data;
    } catch (error) {
      console.error("Error in adminUpdateLanguage:");
      console.error(request);
      console.error(error);
      response.withError(500, "Internal server error");
    }

    return response;
  }
}

export const AdminLanguageRepositoryInstance = new AdminLanguageRepository();
