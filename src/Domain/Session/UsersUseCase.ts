import { UsersRepositoryInstance } from "../../DataProviders/repository/Session/UsersRepository";
import { RequestModel } from "../Core/Entities/RequestModel";
import { ResponseModel } from "../Core/Entities/ResponseModel";
import { UsersFilter } from "./Entities/UsersFilter";
import { User } from "./Entities/User";

export class UsersUseCase {
  getUsersNotShared(
    request: RequestModel<UsersFilter>
  ): Promise<ResponseModel<User[]>> {
    return UsersRepositoryInstance.getUsersNotShared(request);
  }
}
