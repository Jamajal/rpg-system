import { Router } from 'express';
import { createTable } from '../controllers/TableControllers/CreateTableController';
import {
  getAllActiveTables,
  getAllTables,
  getOneTable,
} from '../controllers/TableControllers/GetTableController';
import { deleteTable } from '../controllers/TableControllers/DeleteTableController';
import { updateTable } from '../controllers/TableControllers/UpdateTableController';
import { authMiddleware } from '../middlewares/auth';

const tableRoutes = Router();

//tableRoutes.use(authMiddleware);

tableRoutes.get('/', getAllTables);
tableRoutes.post('/', createTable);
tableRoutes.get('/actives', getAllActiveTables);
tableRoutes.get('/:id', getOneTable);
tableRoutes.delete('/:id', deleteTable);
tableRoutes.patch('/:id', updateTable);

export default tableRoutes;
