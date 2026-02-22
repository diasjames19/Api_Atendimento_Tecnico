import  express  from "express";
import usersRoutes from "./Models/Users/usersRoutes";


export const app = express();
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/users", usersRoutes);
app.use("/users", usersRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
     res.json({ message: "API Helpdesk rodando 🚀" });
});

