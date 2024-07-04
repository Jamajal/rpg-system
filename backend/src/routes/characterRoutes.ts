import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { createCharacter } from '../controllers/CharacterControllers/CreateCharacterController';
import {
  getAllCharacters,
  getCharacterById,
} from '../controllers/CharacterControllers/GetCharacterController';
import { deleteCharacter } from '../controllers/CharacterControllers/DeleteCharacterController';
import { updateCharacter } from '../controllers/CharacterControllers/UpdateCharacterController';

const characterRoutes = Router();

//characterRoutes.use(authMiddleware);

characterRoutes.post('/', createCharacter);
characterRoutes.get('/', getAllCharacters);
characterRoutes.get('/:id', getCharacterById);
characterRoutes.patch('/:id', updateCharacter);
characterRoutes.delete('/:id', deleteCharacter);

export default characterRoutes;
