import { Router } from 'express';
import { createSkill } from '../controllers/SkillControllers/CreateSkillController';
import {
  getAllSkills,
  getSkillById,
} from '../controllers/SkillControllers/GetSkillController';
import { deleteSkill } from '../controllers/SkillControllers/DeleteSkillController';
import { updateSkill } from '../controllers/SkillControllers/UpdateSkillController';

const skillRoutes = Router();

//skillRoutes.use(authMiddleware);

skillRoutes.get('/', getAllSkills);
skillRoutes.post('/', createSkill);
skillRoutes.get('/:id', getSkillById);
skillRoutes.delete('/:id', deleteSkill);
skillRoutes.patch('/:id', updateSkill);

export default skillRoutes;
