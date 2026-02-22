import { Request, Response, NextFunction } from "express";
import { IPayload } from "../../Models/Users/Interfaces/IPayloadDTO";
import { UserRole } from "../enums/UserRole";



export function authorizeRoles(...RolesUserSPermitidos: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
         if (!req.user) {
      return res.status(401).json({
        message: "Não autenticado"
      });
    }

    if (!RolesUserSPermitidos.includes(req.user.role)) {
      return res.status(403).json({
        message: "Acesso negado"
      });
    }

    return next();
  };
    }

