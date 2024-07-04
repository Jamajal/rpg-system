import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import prisma from '../../database';

export const deleteSystem = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  try {
    const system = await prisma.system.delete({
      where: {
        id,
      },
    });

    if (system) {
      return res.json({
        message: `Sistema "${system.name}" com sucesso.`,
        object: {},
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar deletar o sistema.', 500);
  }

  throw new NotFoundError('Sistema não encontrado.');
};
