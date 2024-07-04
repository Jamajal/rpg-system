import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  NotModified,
} from '../../helpers/api-erros';
import { inventoryItemExistsById, updateNeeded } from './utils';
import prisma from '../../database';

export const updateInventoryItem = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, details, space, prestigy } = req.body;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  if (
    !name &&
    !details &&
    !space &&
    space !== 0 &&
    !prestigy &&
    prestigy !== 0
  ) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldInventoryItem = await inventoryItemExistsById(id);

  if (!oldInventoryItem) {
    throw new NotFoundError('Nenhum item com o id informado foi encontrado.');
  }

  const inventoryItemUpdateNeeded = await updateNeeded(
    { name, details, space, prestigy },
    oldInventoryItem
  );

  if (!inventoryItemUpdateNeeded) {
    throw new NotModified('Os campos já estão atualizados');
  }

  try {
    const inventoryItem = await prisma.inventoryItem.update({
      where: {
        id,
      },
      data: {
        name,
        details,
        space,
        prestigy,
      },
    });

    return res.json({
      message: `Item "${inventoryItem.name}" atualizado com sucesso."`,
    });
  } catch {
    throw new ApiError('Algo deu errado ao atualizar o item.', 500);
  }
};
