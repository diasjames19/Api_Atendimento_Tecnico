import { UserRole } from "../../../Shared/enums/UserRole";
export interface IPayload {
  id: string;
  role: UserRole;
}