import { app } from "./app";
import dotenv from "dotenv";
import { conectarAoBanco } from "./Shared/config/database";

dotenv.config();

const PORT = process.env.PORT;
async function iniciarServidor(){
    await conectarAoBanco();

    app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
}

iniciarServidor();
