import { UserModel } from "./usersModels";
import IUsersDTO from "./Interfaces/IUsers";


export class UsersRepository {
  async create(data: IUsersDTO) {
    return UserModel.create(data);
  }
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
  async findById(id: string) {
    return UserModel.findById(id);
  }

  async  listUsers() {
   return UserModel.find();
   
  }
}
