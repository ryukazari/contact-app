import User from '../models/user.model';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

let userController = {};

userController.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const usuarioEncontrado = await User.findOne({userName});
        if (!usuarioEncontrado) {
            return res.status(200).json({
                ok: false,
                message: `Nombre de usuario no existe`,
            })
        }
        if(!bcrypt.compareSync(password, usuarioEncontrado.password)){
            return res.status(200).json({
                ok: false,
                message: `Contraseña errónea`,
            })
        }
        let token = jwt.sign({
            user: usuarioEncontrado
        },'secret',{expiresIn:'24h'})
        return res.status(200).json({
            ok: true,
            user: {
                id: usuarioEncontrado._id,
                userName: usuarioEncontrado.userName,
            },
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error en el login`
        })
    }
}

userController.createUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
        const userCreated = new User({
            userName,
            password: encryptedPassword
        });
        await userCreated.save();
        return res.status(200).json({
            ok: true,
            message: `Usuario registrado`,
            data: userCreated
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error en el registro de usuario`
        })
    }
}

export default userController;