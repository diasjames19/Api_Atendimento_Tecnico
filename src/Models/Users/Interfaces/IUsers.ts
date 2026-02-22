import { UserRole } from "../../../Shared/enums/UserRole";

interface IUsersDTO {
   id?: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
 export default IUsersDTO;