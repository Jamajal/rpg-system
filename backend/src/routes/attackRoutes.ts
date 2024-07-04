import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { createAttack } from '../controllers/AttackControllers/CreateAttackController';
import {
  getAllAttacks,
  getAttackById,
} from '../controllers/AttackControllers/GetAttackController';
import { deleteAttack } from '../controllers/AttackControllers/DeleteAttackController';
import { updateAttack } from '../controllers/AttackControllers/UpdateAttackControllers';

const attackRoutes = Router();

//attackRoutes.use(authMiddleware);

attackRoutes.get('/', getAllAttacks);
attackRoutes.post('/', createAttack);
attackRoutes.get('/:id', getAttackById);
attackRoutes.delete('/:id', deleteAttack);
attackRoutes.patch('/:id', updateAttack);

export default attackRoutes;
