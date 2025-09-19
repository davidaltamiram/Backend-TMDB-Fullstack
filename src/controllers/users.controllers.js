import {pool} from "../db/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js";

//Datos necesarios -> {email, password}
// {
//   "email": "usuario@ejemplo.com",
//   "password": "contraseña123"
// }
export const loginUSer = async (req, res) => {
    const {email, password} = req.body

    //Validamos si el usuario existe
    if (!email || !password){
        return res.status(400).json({message: 'Email y contraseña son necesarios'})
    }

    //Buscamos el usuario por email
    try{
        const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        if (userRows.length === 0){
            return res.status(401).json({message: 'Credenciales invalidas'})
        }
        
        const user = userRows[0];
        const passwordHash = user.password_hash;

        //Comparamos la contraseña ingresa con el password_hash guardado
        const isMatch = await bcrypt.compare(password, passwordHash);
        if(!isMatch){
            return res.status(401).json({message: 'Credenciales invalidas'})
        }

        //Generar y devolver un token de jwt si es valida
        const payload = {
            id: user.id,
            email: user.email,
        };

        //Cargamos el payload y enviamos el token con un mensaje
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '15m'});
        res.status(200).json({
            message: 'Login exitoso',
            token: token,
        })
    } catch (error){
        console.log('Error en el login', error);
        res.status(500).json({message: 'Algo salio mal intentalo mas tarde'})
    }
}; 

//Datos necesarios -> {name, email, password}
// Body json de ejemplo:
// {
//   "name": "David Altamira",
//   "email": "admin@email.com",
//   "password": "david7u7"
// }
export const RegisterUser = async (req, res) =>{
    const {name, email, password} = req.body;

    //Validar que los datos esten completos
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios'});
    }

    try {
        //Verificamos si el correo ya existe
        const [existingUser] = await pool.query ('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({message: 'El correo electronico ya esta registrado'})
        }

        //Generar un salt y hashear las contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        //Guardamos al usuario en la bd
        await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash]);

        //Enviar mensaje de exito
        res.status(201).json({message: 'Usuario Registrado con Exito'})
    } catch (error) {
        console.error('Error al Registrar el usuario:', error);
        res.status(500),json({message: 'Algo Salio mal, intente de nuevo mas tarde'})
    }
};

//Datos necesarios -> (email, password)
// Body json de ejemplo:
// {
//   "email": "juan.perez@email.com",
//   "newPassword": "miNuevaContraseña"
// }
export const ChangePassword =  async (req, res) => {
    const {email, newPassword} = req.body;

    //Validamos que los datos esten completos
    if (!email || !newPassword) {
        return res.status(400).json({message: 'Email y nuevo contraseña requeridos'})
    }

    try {
        //Buscamos que el usuario y validamos si existe
        const [user] = await pool.query('SELECT id from users WHERE email = ?', [email])
        if(user.length === 0){
            return res.status(404).json({message: 'El usuario no existe'})
        }

        //Generamos un nuevo salt y hash para el nuevo password
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        //Actualizamos con el nuevo password ya hasheado y lo enviamos la bd
        await pool.query('UPDATE users SET password_hash = ? WHERE email = ?', [newPasswordHash,email]);
        res.status(200).json({message: 'Contraseña actualizada'})
    }catch (error){
        console.error('Error al actualizar la contraseña', error);
        res.status(500).json({message: 'Algo Salio mal, intente de nuevo mas tarde'})
    }
};