import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import { SelectUserByEmail, SelectPermissionsByUser } from "./SessionDao";


const ajv = new Ajv();

export default class SessionManagement {

  signIn = async (req: Request, res: Response) => {
    let transactionId = "signIn";
    try {
      let data = req.body;
      let users = (await SelectUserByEmail(data.email))[0];
      if (users.length == 0) {
        throw "User not valid."
      }

      let user:any=users[0];

      let permissions = (await SelectPermissionsByUser(user.id))[0];

      let session = {
        user: user,
        permissions:permissions
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "User authenticated.";
      responseApi.data = JSON.parse(JSON.stringify(session));
      responseApi.transactionId = transactionId;

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "01";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = transactionId;
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
