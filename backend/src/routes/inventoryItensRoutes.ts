import { Router } from 'express';
import { createInventoryItem } from '../controllers/InventoryItemControllers/CreateInventoryItemController';
import {
  getAllInventoryItens,
  getInventoryItemById,
} from '../controllers/InventoryItemControllers/GetInventoryItemController';
import { deleteInventoryItem } from '../controllers/InventoryItemControllers/DeleteInventoryItemController';
import { updateInventoryItem } from '../controllers/InventoryItemControllers/UpdateInventoryItemController';

const inventoryItens = Router();

//skillRoutes.use(authMiddleware);

inventoryItens.get('/', getAllInventoryItens);
inventoryItens.post('/', createInventoryItem);
inventoryItens.get('/:id', getInventoryItemById);
inventoryItens.delete('/:id', deleteInventoryItem);
inventoryItens.patch('/:id', updateInventoryItem);

export default inventoryItens;
