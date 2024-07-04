import { Router } from 'express';
import { createUser } from '../controllers/UserControllers/CreateUserController';
import { login } from '../controllers/UserControllers/AuthorizationController';
import {
  getAllUsers,
  getUserById,
  validateToken,
} from '../controllers/UserControllers/GetUserController';
import { authMiddleware } from '../middlewares/auth';
import { deleteUser } from '../controllers/UserControllers/DeleteUserController';
import { updateUser } from '../controllers/UserControllers/UpdateUserController';

const userRoutes = Router();

userRoutes.post('/login', login);

//userRoutes.use(authMiddleware);

userRoutes.get('/validate-token', validateToken);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.patch('/:id', updateUser);

export default userRoutes;
