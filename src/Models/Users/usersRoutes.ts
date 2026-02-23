import { Router } from "express";
import { UsersController } from "./usersControllers";
import { loginUsersControllers } from "./Login/loginUsersControllers";
import { authMiddleware } from "../../Shared/Middlewares/authMiddleware";
import { authorizeRoles } from "../../Shared/Middlewares/roleMiddleware";
import { UserRole } from "../../Shared/enums/UserRole";
import { UsersService } from "./usersServices";



const router = Router();
const usersController = new UsersController();

router.post("/register", (req, res) => usersController.registrarUsuario(req, res));
router.get("/listar", (req, res) => usersController.listarUsuarios(req, res));
router.post("/login", (req, res) => {
    const loginController = new loginUsersControllers();
    return loginController.login(req, res);
});
router.get("/perfil", authMiddleware, (req, res) => {
    return res.json({ message: "Acesso autorizado ao perfil do usuário",
        user: req.user// Informações do usuário autenticado disponíveis aqui
    });
});
router.get(
  "/administracao",
  authMiddleware,
  authorizeRoles(UserRole.ADMIN),
  (req, res) => {
    return res.json({
      message: "Bem-vindo ADMIN"
    });
  }
); 

router.post(
  "/criar-tecnico",
  authMiddleware,
  authorizeRoles(UserRole.ADMIN),
  (req, res) => usersController.registrarUsuarioTecnico(req, res)
); 

export default router;