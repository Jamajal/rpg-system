import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import prisma from '../../database';
import { inventoryItemExistsById } from './utils';

export const getAllInventoryItens = async (req: Request, res: Response) => {
  try {
    const inventoryItens = await prisma.inventoryItem.findMany();

    if (inventoryItens && inventoryItens.length) {
      return res.json({
        message: 'Itens buscados com sucesso',
        object: inventoryItens,
      });
    }
  } catch (error) {
    throw new ApiError('Algo deu errado ao buscar todos os itens.', 500);
  }

  throw new NotFoundError('Não foi encontrado nenhum item no banco de dados.');
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  const inventoryItemExists = await inventoryItemExistsById(id);
  if (!inventoryItemExists) {
    throw new NotFoundError('Nenhum item encontrado com o id informado.');
  }

  try {
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id },
    });

    if (inventoryItem) {
      return res.json({
        message: `Item "${inventoryItem.name}" encontrado com sucesso.`,
        object: inventoryItem,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar encontrar o item.', 500);
  }
};
