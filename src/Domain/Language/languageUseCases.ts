import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import { Language, LanguageSchema, OrmLanguage, SearchLanguagesByTypeAndUser, SearchLanguagesByUser } from "./Entities/Language";
import { UserLanguage, UserLanguageSchema, OrmUserLanguage, SearchUserPermissions } from "./Entities/UserLanguage";
import { User, UserSchema, OrmUser } from "../Session/Entities/User";


const ajv = new Ajv();

export default class LanguageManagement {
  getDetailLanguages = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const searchLanguage = (await OrmLanguage.findAll()) as Language;
      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully v2";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguage));
      responseApi.transactionId = "getDetailLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "03";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
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
      responseApi.message = "Language were found successfully v2";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguageByType));
      responseApi.transactionId = "getDetailLanguageByType_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "04";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "getDetailLanguageByType_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getVersion = async (_req: Request, res: Response): Promise<Response> => {
    try {
      let version = {
        Version: "1.23.04.03.20"
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully v2";
      responseApi.data = JSON.parse(JSON.stringify(version));;
      responseApi.transactionId = "getLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "05";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "getLanguages_";
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
      responseApi.message = "Language were found successfully v2";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguage));
      responseApi.transactionId = "getLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "05";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
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
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "getLanguageByType_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getLanguageByTypeAndUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let type = req.params.type.toUpperCase();
      console.log(type);
      let userId = req.params.userId;
      console.log(userId);
      const searchLanguageByType = (await SearchLanguagesByTypeAndUser(type, userId));

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguageByType[0]));
      responseApi.transactionId = "getLanguageByTypeAndUser_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "06";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "getLanguageByTypeAndUser_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  getLanguagesByUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let transactionId = "getLanguageByUser_"
    try {
      let userId = req.params.userId;
      console.log(userId);
      const searchLanguageByType = (await SearchLanguagesByUser(userId));

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(searchLanguageByType[0]));
      responseApi.transactionId = transactionId;

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "06";
      responseApi.data = JSON.parse(
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = transactionId;
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
      language.stateAccept = "PENDING";

      validate = ajv.compile(LanguageSchema);
      valid = validate(req.body.data);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
          JSON.stringify(validate.errors)
        );

      let userId = req.body.user;

      const permissions = (await SearchUserPermissions(userId))[0];
      if (!permissions) {
        throw "You are not authorized to create this record."
      }
      if (permissions.length == 0) {
        throw "You are not authorized to create this record."
      }

      let permissionApproveLanguages = false;
      let permissionCreateLanguages = false;
      for (let i = 0; i < permissions.length; i++) {
        let element: any = permissions[i];
        if (element.id == 1) {
          permissionCreateLanguages = true;
        }
        else if (element.id == 2) {
          permissionApproveLanguages = true;
        }
      }

      if (!permissionApproveLanguages) {
        if (!permissionCreateLanguages) {
          throw "You are not authorized to create this record."
        } 
        language.stateAccept = "PENDING";
      }

      let newLanguage: any = await OrmLanguage.create(language, {
        fields: [
          "name",
          "abstractSyntax",
          "concreteSyntax",
          "type",
          "stateAccept",
          //add semantics support
          "semantics",
        ],
      });

      let userLanguage: UserLanguage = new UserLanguage();
      userLanguage.language_id = newLanguage.id;
      userLanguage.user_id = userId;

      let newUserLanguage = await OrmUserLanguage.create(userLanguage, {
        fields: [
          "user_id",
          "language_id",
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
        JSON.stringify('{"messageError": "' + e + '"}')
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

      const userId = req.body.user;

      const permissions = (await SearchUserPermissions(userId))[0];
      if (!permissions) {
        throw "You are not authorized to modify this record."
      }
      if (permissions.length == 0) {
        throw "You are not authorized to modify this record."
      }

      let permissionApproveLanguages = false;
      let permissionCreateLanguages = false;
      for (let i = 0; i < permissions.length; i++) {
        let element: any = permissions[i];
        if (element.id == 1) {
          permissionCreateLanguages = true;
        }
        else if (element.id == 2) {
          permissionApproveLanguages = true;
        }
      }

      if (!permissionApproveLanguages) {
        if (!permissionCreateLanguages) {
          throw "You are not authorized to modify this record."
        }
        let userLanguage = (await OrmUserLanguage.findOne({
          where: {
            user_id: userId,
            language_id: language.id,
          },
        })) as UserLanguage; 
        if (!userLanguage) {
          throw "You are not authorized to modify this record."
        }
        language.stateAccept = "PENDING";
      }


      let updateLanguage = await OrmLanguage.update(
        {
          name: language.name,
          abstractSyntax: language.abstractSyntax,
          concreteSyntax: language.concreteSyntax,
          type: language.type,
          stateAccept: language.stateAccept,
          //add semantics field
          semantics: language.semantics,
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
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "updateLanguage_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  deleteLanguage = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.params.userId;

      const permissions = (await SearchUserPermissions(userId))[0];
      if (!permissions) {
        throw "You are not authorized to delete this record."
      }
      if (permissions.length == 0) {
        throw "You are not authorized to delete this record."
      }

      let permissionApproveLanguages = false;
      let permissionCreateLanguages = false;
      for (let i = 0; i < permissions.length; i++) {
        let element: any = permissions[i];
        if (element.id == 1) {
          permissionCreateLanguages = true;
        }
        else if (element.id == 2) {
          permissionApproveLanguages = true;
        }
      }

      if (!permissionApproveLanguages) {
        if (!permissionCreateLanguages) {
          throw "You are not authorized to delete this record."
        }
        let userLanguage = (await OrmUserLanguage.findOne({
          where: {
            user_id: userId,
            language_id: id,
          },
        })) as UserLanguage; 
        if (!userLanguage) {
          throw "You are not authorized to delete this record."
        } 
      } 

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
        JSON.stringify('{"messageError": "' + e + '"}')
      );
      responseApi.transactionId = "deleteLanguage_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
