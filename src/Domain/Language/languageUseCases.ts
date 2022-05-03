import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import { Language, LanguageSchema, OrmLanguage } from "./Entities/Language";

const ajv = new Ajv();

export default class LanguageManagement {
  getDetailLanguages = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const searchLanguage = (await OrmLanguage.findAll()) as Language;

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguage));
      responseApi.transactionId = "getDetailLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "03";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getDetailLanguages_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getDetailLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const searchLanguageByType = (await OrmLanguage.findAll({
        where: { type: req.params.type.toUpperCase() },
      })) as Language;

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguageByType));
      responseApi.transactionId = "getDetailLanguageByType_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "04";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getDetailLanguageByType_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getLanguages = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const searchLanguage = (await OrmLanguage.findAll({
        attributes: ["id", "name", "type"],
      })) as Language;

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguage));
      responseApi.transactionId = "getLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "05";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getLanguages_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const searchLanguageByType = (await OrmLanguage.findAll({
        attributes: ["id", "name", "type"],
        where: { type: req.params.type.toUpperCase() },
      })) as Language;

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguageByType));
      responseApi.transactionId = "getLanguageByType_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "06";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getLanguageByType_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  createLanguage = async (req: Request, res: Response) => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let language: Language = new Language();
      language = Object.assign(language, req.body.data);

      validate = ajv.compile(LanguageSchema);
      valid = validate(req.body.data);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let newLanguage = await OrmLanguage.create(language, {
        fields: [
          "name",
          "abstractSyntax",
          "concreteSyntax",
          "type",
          "stateAccept",
        ],
      });

      if (newLanguage) {
        const responseApi = new ResponseAPISuccess();
        responseApi.message = "Language created successfully";
        responseApi.data = JSON.parse(JSON.stringify(language));
        responseApi.transactionId = "createLanguage_";

        return res.status(200).json(responseApi);
      }
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "01";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "createLanguage_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  updateLanguage = async (req: Request, res: Response): Promise<Response> => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let language: Language = new Language();
      language = Object.assign(language, req.body.data);
      language.id = parseInt(req.params.id);

      validate = ajv.compile(LanguageSchema);
      valid = validate(req.body.data);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let updateLanguage = await OrmLanguage.update(
        {
          name: language.name,
          abstractSyntax: language.abstractSyntax,
          concreteSyntax: language.concreteSyntax,
          type: language.type,
          stateAccept: language.stateAccept,
        },
        {
          where: { id: language.id },
        }
      );

      if (updateLanguage.toString() === "0")
        throw new Error("Something wrong, Language not found.");

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language updated successfully";
      responseApi.data = JSON.parse(JSON.stringify(language));
      responseApi.transactionId = "updateLanguage_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "02";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "updateLanguage_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  deleteLanguage = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleteLanguage = (await OrmLanguage.destroy({
        where: { id: id },
      })) as Language;

      if (deleteLanguage) {
        const responseApi = new ResponseAPISuccess();
        responseApi.message = "Language deleted successfully";
        responseApi.transactionId = "deleteLanguage_";

        return res.status(200).json(responseApi);
      }
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "07";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "deleteLanguage_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
