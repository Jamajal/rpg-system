import { Request, Response } from 'express';
import { ApiError, BadRequestError } from '../../helpers/api-erros';
import prisma from '../../database';

export const createInventoryItem = async (req: Request, res: Response) => {
  const { name, details, space, prestigy } = req.body;

  if (!name || !details) {
    throw new BadRequestError('Informações obrigatórias não foram passadas.');
  }

  if ((!space && space !== 0) || (!prestigy && prestigy !== 0)) {
    throw new BadRequestError('Informações obrigatórias não foram passadas.');
  }

  try {
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        name,
        details,
        space,
        prestigy,
      },
    });

    if (inventoryItem) {
      return res.json({
        message: `Item "${inventoryItem.name}" criado com sucesso.`,
        object: inventoryItem,
      });
    }

    throw new ApiError('Não foi possível criar o item.', 500);
  } catch (error) {
    throw new ApiError('Algo deu errado ao criar o item.', 500);
  }
};
