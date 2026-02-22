import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();


const stringConnection = process.env.MongoStringConexao;
export async function conectarAoBanco() {
    try{
        await mongoose.connect(stringConnection as string);
        console.log("✅ Banco de dados conectado");           
    
    }catch(error){
       console.error("❌ Erro ao conectar no banco", error);
        process.exit(1);
    }   
}
