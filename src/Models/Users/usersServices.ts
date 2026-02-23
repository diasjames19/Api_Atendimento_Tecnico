import bcrypt from "bcryptjs";
import { UsersRepository } from "./usersRepository";
import { UserRole } from "../../Shared/enums/UserRole";
import jwt from "jsonwebtoken";
import { IRegisterUserDTO } from "./Interfaces/IRegisterUserDTO";
import { IUserResponseDTO } from "./Interfaces/IUserResponseDTO";
import { ILoginDTO } from "./Interfaces/ILoginDTO";



export class UsersService {
  private usersRepository = new UsersRepository(); 

  async rgistrarUsuario(data: IRegisterUserDTO): Promise<IUserResponseDTO> {
    const userExists = await this.usersRepository.findByEmail(data.email);
    if(userExists){
        throw new Error("Usuário já existe");
    }

    const senhaSegura = await bcrypt.hash(data.senha, 10);
    const novoUsuario = await this.usersRepository.create({
        nome: data.nome,
        email: data.email,
        senha: senhaSegura,
        role: UserRole.CLIENTE

});
    return {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
       email: novoUsuario.email,
       role: novoUsuario.role
    }

  }

    async listarUsuarios() { 
    const listarUsuarios = await this.usersRepository.listUsers();
    if(listarUsuarios.length === 0){
        throw new Error("Nenhum usuário Cadastrado");
    }
   return {
            listarUsuarios: listarUsuarios.map(user => ({
                id: user._id,
                nome: user.nome,
                email: user.email,
                role: user.role
            }))
        };
    }

    async login(data: ILoginDTO) {
    const verificarlogin = await this.usersRepository.findByEmail(data.email);
    if (!verificarlogin) {
      throw new Error("Usuário não encontrado");
    }else{
        try{
            const validarEmail = await this.usersRepository.findByEmail(data.email);
            if(!validarEmail){
                throw new Error("Email ou senha inválidos");
            }else if(validarEmail){

                const senhavalidar = await bcrypt.compare(data.senha, validarEmail.senha);
                if(!senhavalidar){
                    throw new Error("Email ou senha inválidos");
        }
    }

     const token = jwt.sign({
      id: validarEmail.id,
      role: validarEmail.role
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d"
    });
    return {
        token     
        };
    }catch(error: any){
         throw new Error(error.message || "Erro ao realizar login");
    }
    }
}

async registrarUsuarioTecnico(data: IRegisterUserDTO): Promise<IUserResponseDTO> {
        const userExists = await this.usersRepository.findByEmail(data.email);
    if(userExists){
        throw new Error("Usuário já existe");
    }

    const senhaSegura = await bcrypt.hash(data.senha, 10);
    const novoUsuarioTecnico = await this.usersRepository.create({
        
        nome: data.nome,
        email: data.email,
        senha: senhaSegura,
        role: UserRole.TECNICO

});
return {
        id: novoUsuarioTecnico.id,
        nome: novoUsuarioTecnico.nome,  
        email: novoUsuarioTecnico.email,
        role: novoUsuarioTecnico.role
  }

}
}