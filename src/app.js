import express from "express";
import { PORT } from "./config/config.js";
import { logsServer } from "./middleware/logs.js";
import UsersRoutes from "./routes/users.routes.js"

const app = express();

// Middleware para parsear el cuerpo de la petición como JSON
app.use(express.json());

//hacemos que pase por el middleware para lograr la captura del log
app.use(logsServer);

//Usamos UsersRoutes para que llame los endpoints de users
app.use(UsersRoutes);

//Escucha del puerto, ruta y log del server
app.listen(PORT, () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
});