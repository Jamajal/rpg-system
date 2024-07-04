import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import { inventoryItemExistsById } from './utils';
import prisma from '../../database';

export const deleteInventoryItem = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  const inventoryItemExists = await inventoryItemExistsById(id);
  if (!inventoryItemExists) {
    throw new NotFoundError('Nenhum item encontrado com o id informado.');
  }

  try {
    const deleteItem = await prisma.inventoryItem.delete({
      where: {
        id,
      },
    });

    if (deleteItem) {
      return res.json({
        message: `Item "${deleteItem.name}" deletado com sucesso.`,
        object: {},
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar deletar o item', 500);
  }
};
