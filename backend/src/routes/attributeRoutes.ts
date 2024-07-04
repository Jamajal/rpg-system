import { Router } from 'express';
import { createAttribute } from '../controllers/AttributeControllers/CreateAttributeController';
import {
  getAllAttributes,
  getAttributeById,
} from '../controllers/AttributeControllers/GetAttributeControler';
import { deleteAttribute } from '../controllers/AttributeControllers/DeleteAttributeController';
import { updateAttribute } from '../controllers/AttributeControllers/UpdateAttributeController';

const attributeRoutes = Router();

//attributeRoutes.use(authMiddleware);

attributeRoutes.post('/', createAttribute);
attributeRoutes.get('/', getAllAttributes);
attributeRoutes.get('/:id', getAttributeById);
attributeRoutes.delete('/:id', deleteAttribute);
attributeRoutes.patch('/:id', updateAttribute);

export default attributeRoutes;
