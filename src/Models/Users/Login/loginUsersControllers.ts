import { Request,Response } from "express";
import { UsersService } from "../usersServices";
import { UserRole } from "../../../Shared/enums/UserRole";
import jwt from "jsonwebtoken";



export class loginUsersControllers {
    private loginUsersService = new UsersService();

    async login(req: Request, res: Response):Promise<Response> {
        try{
            const {email, senha} = req.body;    

            const token = await this.loginUsersService.login({
                email,
                senha
            });
            return res.status(200).json(token);   
        }catch(error: any){
        return res.status(400).json({
        message: error.message || "Erro ao realizar login"
    });

}
    }
  
}

  