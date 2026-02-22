import { Request,Response } from "express";
import { UsersService } from "./usersServices";
import { UserRole } from "../../Shared/enums/UserRole";


export class UsersController {

    private usersService = new UsersService();

    async registrarUsuario(req: Request, res: Response): Promise<Response> {
        try{
            const {nome, email, senha} = req.body;
            const novoUsuario = await this.usersService.rgistrarUsuario({
                nome, 
                email,
                senha
            });
            return res.status(201).json(novoUsuario);   
        }catch(error: any){
        return res.status(400).json({
        message: error.message || "Erro ao registrar usuário"
    });
}
}
    async listarUsuarios(req: Request, res: Response): Promise<Response> {
        // Lógica para listar usuários
        const listarUsuarios= await this.usersService.listarUsuarios();
        const mensagem  = "Usuarios listados com Sucesso";
        return res.status(200).json({message: mensagem, usuarios: listarUsuarios});   
        //;
}

}