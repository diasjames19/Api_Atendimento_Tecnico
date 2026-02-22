import { Schema, model } from "mongoose";
import { UserRole } from "../../Shared/enums/UserRole";

const userSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENTE
    }
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
