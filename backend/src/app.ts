import 'express-async-errors';
import express from 'express';
import cors from 'cors';
//import { json, urlencoded } from 'body-parser';

import { errorMiddleware } from './middlewares/error';
import tableRoutes from './routes/tableRoutes';
import userRoutes from './routes/userRoutes';
import characterRoutes from './routes/characterRoutes';
import attackRoutes from './routes/attackRoutes';
import inventoryItensRoutes from './routes/inventoryItensRoutes';
import skillRoutes from './routes/skillRoutes';
import systemRoutes from './routes/systemRoutes';
import attributeRoutes from './routes/attributeRoutes';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
/* app.use(json());
app.use(urlencoded({ extended: true })); */

app.use(cors());
app.use('/tables', tableRoutes);
app.use('/users', userRoutes);
app.use('/characters', characterRoutes);
app.use('/weapons', attackRoutes);
app.use('/inventory-itens', inventoryItensRoutes);
app.use('/skills', skillRoutes);
app.use('/systems', systemRoutes);
app.use('/attributes', attributeRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
