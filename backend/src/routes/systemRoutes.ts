import { Router } from 'express';
import { createSystem } from '../controllers/SystemControllers/CreateSystemController';
import {
  getAllSystem,
  getSystemById,
} from '../controllers/SystemControllers/GetSystemController';
import { deleteSystem } from '../controllers/SystemControllers/DeleteSystemController';
import { updateSystem } from '../controllers/SystemControllers/UpdateSystemController';

const systemRoutes = Router();

//skillRoutes.use(authMiddleware);

systemRoutes.post('/', createSystem);
systemRoutes.get('/', getAllSystem);
systemRoutes.get('/:id', getSystemById);
systemRoutes.delete('/:id', deleteSystem);
systemRoutes.patch('/:id', updateSystem);

export default systemRoutes;
