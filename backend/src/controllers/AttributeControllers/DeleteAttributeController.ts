import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import prisma from '../../database';

export const deleteAttribute = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  try {
    const attribute = await prisma.attributes.delete({
      where: {
        id,
      },
    });

    if (attribute) {
      return res.json({
        message: 'Atributo deletado com sucesso.',
        object: {},
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar os atributos', 500);
  }

  throw new NotFoundError('Atributos não encontrados no banco de dados');
};
