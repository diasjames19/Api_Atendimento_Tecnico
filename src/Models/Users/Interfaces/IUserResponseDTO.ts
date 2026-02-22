import { UserRole } from "../../../Shared/enums/UserRole";


export interface IUserResponseDTO {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}