import { Router } from 'express';
import userController from '../controllers/user.controller';
import contactController from '../controllers/contact.controller';
import typeController from '../controllers/type.controller';
import verificarToken from '../middleware/jwt.middleware';

const router = Router();

// Card routes
router.get('/contact/:id', verificarToken, contactController.getContactById); //Obtiene un solo contacto por id
router.get('/contacts/:id', verificarToken, contactController.getContacts); //Obtiene los contactos de un usuario
router.post('/contact/:id', verificarToken, contactController.createContact); //Crea un contacto
router.put('/contact/:id', verificarToken, contactController.updateContactById); //Modifica un contacto
router.delete('/contact/:id', verificarToken, contactController.deleteContact); //Elimina un contacto

router.post('/user/login', userController.login); //Login usando JWT
router.post('/user/register', userController.createUser); // Registro de usuario

router.get('/types', typeController.getTypes); // Obtener todos los tipos de contacto
router.post('/type/create', typeController.createType); // Registro de tipo de contacto

export default router;